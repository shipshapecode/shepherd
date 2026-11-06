import { createServer } from 'node:http';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  symlinkSync,
  writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import ts from 'typescript';

export const evalDir = fileURLToPath(new URL('.', import.meta.url));
export const defaultPkgDir = resolve(evalDir, '../..');
const reactPkgDir = resolve(defaultPkgDir, '../packages/react');

const MIME = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mjs': 'text/javascript'
};

/**
 * A throwaway consumer project. `shepherd.js` is linked into `node_modules`, so
 * imports resolve through the package's real `exports` map, the same way they
 * do for an installed package.
 */
export function createWorkspace(pkgDir) {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), 'shepherd-llm-eval-')));
  mkdirSync(join(dir, 'node_modules'));
  symlinkSync(pkgDir, join(dir, 'node_modules', 'shepherd.js'));
  for (const name of ['react', 'react-dom', '@types/react']) {
    const source = join(reactPkgDir, 'node_modules', name);
    mkdirSync(dirname(join(dir, 'node_modules', name)), { recursive: true });
    symlinkSync(source, join(dir, 'node_modules', name));
  }
  return dir;
}

const workspaceResolver = (workspace) => ({
  name: 'workspace-resolver',
  setup(pluginBuild) {
    // The wrapper is taken from source, so it needs no build of its own, and its
    // own imports must land on the package under test, not the workspace copy.
    pluginBuild.onResolve({ filter: /^react-shepherd$/ }, () => ({
      path: join(reactPkgDir, 'src/index.tsx')
    }));
    pluginBuild.onResolve(
      { filter: /^(shepherd\.js|react|react-dom)($|\/)/ },
      (args) => {
        if (args.pluginData?.resolved) return undefined;
        return pluginBuild.resolve(args.path, {
          kind: args.kind,
          resolveDir: workspace,
          pluginData: { resolved: true }
        });
      }
    );
    // The lockfile pins react 19.3 and react-dom 19.2, and react-dom refuses to
    // load against a different react.
    pluginBuild.onLoad({ filter: /react-dom-client\.[\w.]+\.js$/ }, (args) => ({
      contents: readFileSync(args.path, 'utf8').replace(
        /"[\d.]+" !== isomorphicReactPackageVersion/,
        'false'
      ),
      loader: 'js'
    }));
  }
});

/**
 * Bundles a solution as a consumer's bundler would. Returns the emitted files,
 * or the bundler's error text when the code does not even build.
 */
export async function bundle(workspace, entryPath) {
  try {
    const result = await build({
      absWorkingDir: workspace,
      entryPoints: [entryPath],
      bundle: true,
      format: 'esm',
      platform: 'browser',
      target: 'es2022',
      jsx: 'automatic',
      define: { 'process.env.NODE_ENV': '"development"' },
      outfile: 'out/bundle.js',
      write: false,
      logLevel: 'silent',
      plugins: [workspaceResolver(workspace)]
    });
    const files = {};
    for (const file of result.outputFiles) {
      files[`/${file.path.split('/').pop()}`] = file.text;
    }
    return { files };
  } catch (error) {
    return {
      error: (error.errors ?? [])
        .map((item) => item.text)
        .join('\n')
        .trim()
        .concat(error.errors?.length ? '' : String(error))
    };
  }
}

/** Runs the compiler over one file with the strict settings of a modern app. */
export function typecheck(workspace, filePath) {
  const program = ts.createProgram([filePath], {
    allowImportingTsExtensions: true,
    jsx: ts.JsxEmit.ReactJSX,
    lib: ['lib.es2022.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    noEmit: true,
    skipLibCheck: true,
    strict: true,
    target: ts.ScriptTarget.ES2022,
    typeRoots: [join(workspace, 'node_modules/@types')],
    types: []
  });
  return ts.getPreEmitDiagnostics(program).map((diagnostic) => {
    const text = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    return `TS${diagnostic.code}: ${text}`;
  });
}

/**
 * Serves a task's page. `pkgDir` is exposed under `/node_modules/shepherd.js/`
 * for the task that has no build step.
 */
export function serve({ html, files = {}, pkgDir }) {
  const server = createServer((req, res) => {
    const path = normalize(decodeURIComponent(req.url.split('?')[0]));
    const send = (body, ext) => {
      res.writeHead(200, {
        'content-type': MIME[ext] ?? 'application/octet-stream',
        'cache-control': 'no-store'
      });
      res.end(body);
    };
    if (path === '/') return send(html, '.html');
    if (files[path] !== undefined) return send(files[path], extname(path));
    const prefix = '/node_modules/shepherd.js/';
    if (path.startsWith(prefix)) {
      const file = join(pkgDir, path.slice(prefix.length));
      if (existsSync(file)) return send(readFileSync(file), extname(file));
    }
    res.writeHead(404);
    res.end();
  });
  return new Promise((done) => {
    server.listen(0, '127.0.0.1', () =>
      done({
        url: `http://127.0.0.1:${server.address().port}/`,
        close: () =>
          new Promise((closed) => {
            server.closeAllConnections();
            server.close(closed);
          })
      })
    );
  });
}

export function writeEntry(workspace, name, source) {
  const path = join(workspace, name);
  writeFileSync(path, source);
  return path;
}

/** Polls until `predicate` holds, so checks never depend on a fixed delay. */
export async function poll(predicate, message, timeout = 3000) {
  const deadline = Date.now() + timeout;
  let last;
  while (Date.now() < deadline) {
    last = await predicate();
    if (last === true) return;
    await new Promise((done) => setTimeout(done, 25));
  }
  const detail = last === false || last === undefined ? '' : ` (got ${last})`;
  throw new Error(`${message}${detail}`);
}

const OPEN = '.shepherd-element:not([hidden])';

/**
 * The vocabulary checks are written in. Everything asserts what a user would
 * see or be able to do on the page, never how the solution's code is written.
 */
export function createDriver(page) {
  const rect = (locator) =>
    locator.evaluate((el) => {
      const { left, right, top, bottom } = el.getBoundingClientRect();
      return { left, right, top, bottom };
    });
  const step = (title) => page.locator(OPEN, { hasText: title });

  const driver = {
    page,
    openCount: () => page.locator(OPEN).count(),
    step,

    async expectStep(title) {
      await poll(
        async () => (await step(title).count()) === 1,
        `a single open step containing "${title}"`
      );
      await poll(
        async () => (await page.locator(OPEN).count()) === 1,
        'exactly one open step',
        1000
      );
    },

    async expectNoStep(timeout = 1500) {
      await poll(
        async () => (await page.locator(OPEN).count()) === 0,
        'no open step',
        timeout
      );
    },

    async stayClosed(ms = 400) {
      await page.waitForTimeout(ms);
      const count = await page.locator(OPEN).count();
      if (count !== 0) throw new Error(`expected no step, found ${count}`);
    },

    async click(title, name) {
      await step(title)
        .getByRole('button', { name, exact: true })
        .click({ timeout: 2000 });
    },

    async expectNoButton(title, name) {
      const count = await step(title)
        .getByRole('button', { name, exact: true })
        .count();
      if (count !== 0) throw new Error(`unexpected "${name}" button`);
    },

    async expectStylesheet() {
      await poll(
        () =>
          page
            .locator(OPEN)
            .first()
            .evaluate((el) => getComputedStyle(el).maxWidth === '400px'),
        "Shepherd's stylesheet is not applied to the step"
      );
    },

    async expectPlaced(title, selector, side) {
      const target = page.locator(selector).first();
      await poll(async () => {
        const a = await rect(step(title));
        const b = await rect(target);
        const overlap = (lo1, hi1, lo2, hi2) =>
          Math.min(hi1, hi2) - Math.max(lo1, lo2) > 0;
        const across = overlap(a.left, a.right, b.left, b.right);
        const along = overlap(a.top, a.bottom, b.top, b.bottom);
        // A centered step can also sit below or beside its target by chance,
        // so the gap has to be small enough to read as attached.
        const gap = {
          bottom: a.top - b.bottom,
          top: b.top - a.bottom,
          right: a.left - b.right,
          left: b.left - a.right
        }[side];
        const placed =
          gap >= -1 &&
          gap <= 40 &&
          (side === 'top' || side === 'bottom' ? across : along);
        return placed === true || JSON.stringify({ step: a, target: b });
      }, `step "${title}" placed ${side} of ${selector}`);
    },

    async expectCentered(title) {
      await poll(async () => {
        const box = await rect(step(title));
        const { width, height } = page.viewportSize();
        const dx = Math.abs((box.left + box.right) / 2 - width / 2);
        const dy = Math.abs((box.top + box.bottom) / 2 - height / 2);
        return (dx < 2 && dy < 2) || JSON.stringify({ dx, dy });
      }, `step "${title}" centered in the viewport`);
    },

    async expectInViewport(selector) {
      await poll(async () => {
        const box = await rect(page.locator(selector).first());
        return box.top >= 0 && box.bottom <= page.viewportSize().height;
      }, `${selector} scrolled into view`);
    }
  };
  return driver;
}
