interface MediaRange {
  type: string;
  subtype: string;
  q: number;
  specificity: number;
}

function parseAccept(accept: string): MediaRange[] {
  return accept
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [range, ...params] = part.split(';');
      const [type = '*', subtype = '*'] = (range ?? '')
        .trim()
        .toLowerCase()
        .split('/');

      let q = 1;
      for (const param of params) {
        const [key, value] = param.split('=').map((s) => s.trim());
        if (key === 'q' && value) {
          const parsed = Number.parseFloat(value);
          if (!Number.isNaN(parsed)) {
            q = Math.min(Math.max(parsed, 0), 1);
          }
        }
      }

      const specificity =
        type === '*' ? 0 : subtype === '*' || subtype === undefined ? 1 : 2;

      return { type, subtype: subtype ?? '*', q, specificity };
    });
}

function quality(ranges: MediaRange[], type: string, subtype: string): number {
  let best: MediaRange | undefined;

  for (const range of ranges) {
    const typeMatches = range.type === '*' || range.type === type;
    const subtypeMatches = range.subtype === '*' || range.subtype === subtype;

    if (typeMatches && subtypeMatches) {
      if (!best || range.specificity > best.specificity) {
        best = range;
      }
    }
  }

  return best ? best.q : 0;
}

/**
 * Returns true when the request's Accept header explicitly asks for
 * text/markdown with a quality at least as high as text/html.
 *
 * Wildcards (`*` and `text/*`) never count as an explicit request for
 * markdown, so browsers (which send `text/html,...,*∕*;q=0.8`) always
 * receive HTML.
 */
export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) {
    return false;
  }

  const ranges = parseAccept(accept);
  const markdown = ranges.find(
    (r) => r.type === 'text' && r.subtype === 'markdown'
  );

  if (!markdown || markdown.q === 0) {
    return false;
  }

  return markdown.q >= quality(ranges, 'text', 'html');
}
