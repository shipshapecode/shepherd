import { spawn, type ChildProcess } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const TEST_PORT = 4871;
export const TEST_BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

const landingDir = fileURLToPath(new URL('../..', import.meta.url));

let devServer: ChildProcess | undefined;

// The child must not inherit Vitest's env markers: Astro 7 backgrounds
// `astro dev` into a detached daemon when it detects an AI coding agent
// (this setup owns the server lifecycle itself, so opt out via
// ASTRO_DEV_BACKGROUND), and Vite serves 404s for every route when it
// sees VITEST in the environment.
const devServerEnv: NodeJS.ProcessEnv = {
  ...process.env,
  ASTRO_DEV_BACKGROUND: '0'
};
delete devServerEnv.VITEST;

async function waitForServer(url: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Server not up yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Dev server did not start within ${timeoutMs}ms`);
}

export default async function setup(): Promise<() => void> {
  devServer = spawn(
    'pnpm',
    [
      'exec',
      'astro',
      'dev',
      '--port',
      String(TEST_PORT),
      '--host',
      '127.0.0.1'
    ],
    {
      cwd: landingDir,
      stdio: 'ignore',
      detached: true,
      env: devServerEnv
    }
  );

  await waitForServer(TEST_BASE_URL, 90_000);

  return () => {
    if (devServer?.pid) {
      try {
        // The dev server is spawned detached in its own process group so the
        // whole tree (pnpm -> astro -> vite) can be killed together.
        process.kill(-devServer.pid, 'SIGTERM');
      } catch {
        devServer.kill('SIGTERM');
      }
    }
  };
}
