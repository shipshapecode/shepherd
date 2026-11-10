// One command to score a built package against the shared criteria.
//
//   pnpm build && node scripts/scorecard/scorecard.mjs [--gates] [--all-browsers]
//                    [--json out.json] [--update-api]
//
// Size is what a consumer actually ships: the package is bundled from its
// published entry through esbuild, and "total" counts every chunk, so moving
// code behind a dynamic import lowers "eager" but never "total".
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';
import { build } from 'esbuild';
import ts from 'typescript';
import { packageDir, scorecardDir } from './lib.mjs';
import { runParity } from './parity.mjs';

const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const pkg = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'));

const gz = (data) => gzipSync(data, { level: 9 }).length;
const br = (data) =>
  brotliCompressSync(data, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 }
  }).length;

const SCENARIOS = {
  attachedTour: `
    import Shepherd from 'shepherd.js';
    const tour = new Shepherd.Tour({ useModalOverlay: true });
    tour.addStep({ text: 'hi', arrow: true, attachTo: { element: '#a', on: 'bottom' } });
    tour.start();`,
  centeredTour: `
    import Shepherd from 'shepherd.js';
    const tour = new Shepherd.Tour();
    tour.addStep({ text: 'hi' });
    tour.start();`
};

async function consumerSize(source) {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), 'shepherd-scorecard-')));
  try {
    mkdirSync(join(dir, 'node_modules'));
    symlinkSync(packageDir, join(dir, 'node_modules', 'shepherd.js'));
    writeFileSync(join(dir, 'entry.mjs'), source);
    const result = await build({
      absWorkingDir: dir,
      entryPoints: ['entry.mjs'],
      bundle: true,
      splitting: true,
      minify: true,
      format: 'esm',
      target: 'es2020',
      outdir: 'out',
      write: false,
      metafile: true,
      logLevel: 'silent'
    });
    const files = new Map(
      result.outputFiles.map((file) => [
        file.path.replace(`${dir}/`, ''),
        file.contents
      ])
    );
    const eager = new Set();
    const visit = (path) => {
      if (eager.has(path)) return;
      eager.add(path);
      for (const imported of result.metafile.outputs[path].imports) {
        if (imported.kind === 'import-statement') visit(imported.path);
      }
    };
    visit('out/entry.js');
    const size = (paths) => {
      const list = [...paths].filter((path) => path.endsWith('.js'));
      return {
        min: list.reduce((sum, path) => sum + files.get(path).length, 0),
        gz: list.reduce((sum, path) => sum + gz(files.get(path)), 0),
        br: list.reduce((sum, path) => sum + br(files.get(path)), 0)
      };
    };
    return {
      eager: size(eager),
      total: size(files.keys()),
      chunks: [...files.keys()].filter((path) => path.endsWith('.js')).length
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function publicApi() {
  const dts = join(packageDir, 'dist/js/shepherd.d.mts');
  const source = ts.createSourceFile(
    dts,
    readFileSync(dts, 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );
  const names = new Set();
  let documented = 0;
  let declared = 0;
  const hasDoc = (node) => (node.jsDoc?.length ?? 0) > 0;
  const isPrivate = (node) =>
    node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.PrivateKeyword);
  const add = (name, node) => {
    names.add(name);
    declared++;
    if (hasDoc(node)) documented++;
  };
  source.forEachChild((node) => {
    if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
      // Bundlers suffix one of two same-named declarations, as in `Step$1`.
      const owner = node.name.text.replace(/\$\d+$/, '');
      add(owner, node);
      for (const member of node.members) {
        const name = member.name?.getText(source);
        if (!name || isPrivate(member) || name.startsWith('_')) continue;
        add(`${owner}.${name}`, member);
      }
    } else if (ts.isTypeAliasDeclaration(node)) {
      add(node.name.text, node);
    } else if (ts.isExportDeclaration(node) && node.exportClause) {
      for (const element of node.exportClause.elements) {
        names.add(`export:${element.name.text}`);
      }
    } else if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const decl of node.declarationList.declarations) {
        names.add(`export:${decl.name.getText(source)}`);
      }
    } else if (ts.isExportAssignment(node)) {
      names.add('export:default');
    }
  });
  const goldenPath = join(scorecardDir, 'golden', 'api.json');
  if (has('--update-api')) {
    writeFileSync(
      goldenPath,
      `${JSON.stringify([...names].sort(), null, 1)}\n`
    );
  }
  const golden = existsSync(goldenPath)
    ? JSON.parse(readFileSync(goldenPath, 'utf8'))
    : [];
  return {
    removed: golden.filter((name) => !names.has(name)),
    added: [...names].filter((name) => !golden.includes(name)).length,
    tsdocCoveragePct: Math.round((documented / declared) * 100),
    dtsApproxTokens: Math.round(source.getFullText().length / 4)
  };
}

function packFootprint() {
  const run = spawnSync(
    'npm',
    ['pack', '--dry-run', '--json', '--ignore-scripts', '--silent'],
    { cwd: packageDir, encoding: 'utf8' }
  );
  const [info] = JSON.parse(run.stdout);
  const paths = info.files.map((file) => file.path);
  return {
    tarballKb: Math.round(info.size / 1024),
    unpackedKb: Math.round(info.unpackedSize / 1024),
    prodDependencies: Object.keys(pkg.dependencies ?? {}).length,
    files: paths.length,
    agentDocsInPackage: paths.filter((path) =>
      /(^|\/)(llms[^/]*\.txt|AGENTS\.md|SKILL\.md)$/i.test(path)
    )
  };
}

function diagnosticsRetained() {
  const bundle = readFileSync(join(packageDir, pkg.module), 'utf8');
  return {
    missingElementMessageShips: /not found/i.test(bundle),
    consoleCalls: (bundle.match(/console\.(error|warn)/g) ?? []).length
  };
}

function runGate(name, command, cwd = packageDir) {
  const started = Date.now();
  const run = spawnSync('sh', ['-c', command], {
    cwd,
    encoding: 'utf8',
    maxBuffer: 1 << 27,
    env: { ...process.env, CI: '1', NO_COLOR: '1' }
  });
  const output = `${run.stdout}\n${run.stderr}`;
  const tests = output.match(/Tests\s+(?:(\d+) failed \| )?(\d+) passed/);
  return {
    name,
    pass: run.status === 0,
    seconds: Math.round((Date.now() - started) / 1000),
    testsPassed: tests ? Number(tests[2]) : undefined,
    testsFailed: tests?.[1] ? Number(tests[1]) : undefined,
    tail: run.status === 0 ? undefined : output.slice(-1500)
  };
}

const report = {
  commit: spawnSync('git', ['rev-parse', '--short', 'HEAD'], {
    encoding: 'utf8',
    cwd: packageDir
  }).stdout.trim(),
  size: {},
  dist: {}
};

for (const [name, source] of Object.entries(SCENARIOS)) {
  report.size[name] = await consumerSize(source);
}
for (const file of [pkg.module, 'dist/css/shepherd.css']) {
  const data = readFileSync(join(packageDir, file));
  report.dist[file] = { min: data.length, gz: gz(data), br: br(data) };
}
report.api = publicApi();
report.pack = packFootprint();
report.diagnostics = diagnosticsRetained();

const browsers = has('--all-browsers')
  ? ['chromium', 'firefox', 'webkit']
  : ['chromium'];
report.parity = [];
for (const browser of browsers) {
  report.parity.push(await runParity({ browser }));
}

if (has('--gates')) {
  const bin = './node_modules/.bin';
  report.gates = [
    runGate('unit', `${bin}/vitest run`),
    runGate(
      'lifecycle',
      `${bin}/vitest run --config test/verify/vitest.config.mjs`
    ),
    runGate(
      'types',
      `${bin}/tsc --module esnext --moduleResolution bundler --noEmit true --emitDeclarationOnly false`
    ),
    runGate(
      'attw',
      `${bin}/attw --pack . --exclude-entrypoints ./dist/css/shepherd.css`
    ),
    runGate('lint', `${bin}/eslint . && ${bin}/prettier --check '**/*.{js,ts}'`)
  ];
}

const jsonAt = args.indexOf('--json');
if (jsonAt >= 0) {
  mkdirSync(dirname(args[jsonAt + 1]), { recursive: true });
  writeFileSync(args[jsonAt + 1], `${JSON.stringify(report, null, 1)}\n`);
}
console.log(JSON.stringify(report, null, 1));

const failed =
  report.api.removed.length > 0 ||
  report.parity.some((run) => run.mismatchCount || run.errors.length) ||
  report.gates?.some((gate) => !gate.pass);
process.exit(failed ? 1 : 0);
