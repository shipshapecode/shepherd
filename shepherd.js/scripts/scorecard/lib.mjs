import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const scorecardDir = fileURLToPath(new URL('.', import.meta.url));
export const packageDir = resolve(scorecardDir, '../..');

const mime = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript'
};

const pageHtml = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="/dist/css/shepherd.css">
<style>
  html, body { margin: 0; font: 14px/1.4 Arial, sans-serif; }
  #page { position: relative; width: 100%; height: 3000px; }
  .target { position: absolute; width: 120px; height: 40px; background: #ccd; }
</style></head><body><div id="page"></div></body></html>`;

export function serve(pkgDir) {
  const server = createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(req.url.split('?')[0]));
    if (path === '/page.html') {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(pageHtml);
      return;
    }
    const file = path.startsWith('/dist/')
      ? join(pkgDir, path)
      : path.startsWith('/vendor/')
        ? join(scorecardDir, path)
        : null;
    try {
      if (!file) throw new Error('not served');
      const body = await readFile(file);
      res.writeHead(200, {
        'content-type': mime[extname(file)] ?? 'application/octet-stream',
        'cache-control': 'no-store'
      });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  return new Promise((done) => {
    server.listen(0, '127.0.0.1', () =>
      done({
        url: `http://127.0.0.1:${server.address().port}`,
        close: () => new Promise((closed) => server.close(closed))
      })
    );
  });
}

export function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function round(value, digits = 2) {
  return Number(value.toFixed(digits));
}
