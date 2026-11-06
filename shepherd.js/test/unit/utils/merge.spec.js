import { describe, expect, it } from 'vitest';
import { merge } from '../../../src/utils/merge';

describe('merge', () => {
  it('merges records recursively without mutating either side', () => {
    const base = { platform: { a: 1, b: 1 } };
    const override = { platform: { b: 2 }, strategy: 'fixed' };

    expect(merge(base, override)).toEqual({
      platform: { a: 1, b: 2 },
      strategy: 'fixed'
    });
    expect(base).toEqual({ platform: { a: 1, b: 1 } });
    expect(override).toEqual({ platform: { b: 2 }, strategy: 'fixed' });
  });

  it('concatenates arrays, base first, into a new array', () => {
    const base = { middleware: [1] };
    const override = { middleware: [2, [3]] };
    const merged = merge(base, override);

    expect(merged.middleware).toEqual([1, 2, [3]]);
    expect(merged.middleware).not.toBe(base.middleware);
  });

  it('shares a value only one side defined', () => {
    const middleware = [1];

    expect(merge({ middleware }, {}).middleware).toBe(middleware);
    expect(merge({}, { middleware }).middleware).toBe(middleware);
  });

  it('never lets undefined override a value, but keeps the key', () => {
    expect(merge({ a: 1 }, { a: undefined })).toEqual({ a: 1 });

    const merged = merge({}, { toString: undefined });
    expect(Object.keys(merged)).toEqual(['toString']);
    expect(merged.toString).toBeUndefined();
  });

  it('takes the last value when types differ', () => {
    expect(merge({ a: [1] }, { a: { b: 1 } })).toEqual({ a: { b: 1 } });
    expect(merge({ a: { b: 1 } }, { a: null })).toEqual({ a: null });
  });

  it('treats class instances as values rather than records', () => {
    class Boundary {
      x = 1;
    }
    const first = new Boundary();
    const second = new Boundary();

    expect(merge({ a: first }, { a: second }).a).toBe(second);
  });

  it('merges plain objects with a null prototype', () => {
    const base = Object.assign(Object.create(null), { a: 1 });

    expect(merge({ o: base }, { o: { b: 2 } }).o).toEqual({ a: 1, b: 2 });
  });

  it('does not pollute prototypes through a __proto__ key', () => {
    const merged = merge(
      JSON.parse('{"__proto__": {"a": 1}}'),
      JSON.parse('{"__proto__": {"polluted": true}}')
    );

    expect({}.polluted).toBeUndefined();
    expect(merged.polluted).toBeUndefined();
    expect(Object.getPrototypeOf(merged)).toBe(Object.prototype);
  });
});
