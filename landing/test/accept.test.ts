import { describe, expect, it } from 'vitest';

import { prefersMarkdown } from '../src/lib/accept';

describe('prefersMarkdown', () => {
  it('returns false when there is no Accept header', () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown('')).toBe(false);
  });

  it('returns true for an explicit text/markdown request', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true);
  });

  it('returns true when markdown and html are equally acceptable', () => {
    expect(prefersMarkdown('text/markdown, text/html')).toBe(true);
    expect(prefersMarkdown('text/html, text/markdown')).toBe(true);
  });

  it('returns true when markdown is preferred over html via q values', () => {
    expect(prefersMarkdown('text/markdown, text/html;q=0.9')).toBe(true);
    expect(prefersMarkdown('text/html;q=0.5, text/markdown;q=0.8')).toBe(true);
  });

  it('returns false when html is preferred over markdown', () => {
    expect(prefersMarkdown('text/html, text/markdown;q=0.8')).toBe(false);
  });

  it('returns false for a typical browser Accept header', () => {
    expect(
      prefersMarkdown(
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      )
    ).toBe(false);
  });

  it('does not treat wildcards as a request for markdown', () => {
    expect(prefersMarkdown('*/*')).toBe(false);
    expect(prefersMarkdown('text/*')).toBe(false);
  });

  it('returns false when markdown is explicitly refused', () => {
    expect(prefersMarkdown('text/markdown;q=0, text/html')).toBe(false);
  });

  it('handles uppercase and whitespace', () => {
    expect(prefersMarkdown('  TEXT/MARKDOWN ; q=1.0 ')).toBe(true);
  });
});
