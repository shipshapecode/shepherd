import { describe, it, expect } from 'vitest';
import { convertDataAttributes } from '../../../shepherd.js/src/utils/data-attributes.ts';

describe('utils/data-attributes', () => {
  describe('convertDataAttributes', () => {
    it('returns empty object when dataAttributes is undefined', () => {
      const result = convertDataAttributes(undefined);
      expect(result).toEqual({});
    });

    it('returns empty object when dataAttributes is null', () => {
      const result = convertDataAttributes(null);
      expect(result).toEqual({});
    });

    it('returns empty object when dataAttributes is empty array', () => {
      const result = convertDataAttributes([]);
      expect(result).toEqual({});
    });

    it('converts single data attribute correctly', () => {
      const result = convertDataAttributes([{ id: 'test', value: 'testValue' }]);
      expect(result).toEqual({ 'data-test': 'testValue' });
    });

    it('converts multiple data attributes correctly', () => {
      const result = convertDataAttributes([
        { id: 'foo', value: 'someData' },
        { id: 'bar', value: '1234' },
        { id: 'baz', value: 'anotherValue' }
      ]);
      expect(result).toEqual({
        'data-foo': 'someData',
        'data-bar': '1234',
        'data-baz': 'anotherValue'
      });
    });

    it('handles numeric values', () => {
      const result = convertDataAttributes([
        { id: 'count', value: 42 },
        { id: 'price', value: 99.99 }
      ]);
      expect(result).toEqual({
        'data-count': '42',
        'data-price': '99.99'
      });
    });

    it('handles boolean values', () => {
      const result = convertDataAttributes([
        { id: 'active', value: true },
        { id: 'disabled', value: false }
      ]);
      expect(result).toEqual({
        'data-active': 'true',
        'data-disabled': 'false'
      });
    });

    it('ignores attributes without id', () => {
      const result = convertDataAttributes([
        { id: 'valid', value: 'validValue' },
        { value: 'noId' },
        { id: '', value: 'emptyId' }
      ]);
      expect(result).toEqual({ 'data-valid': 'validValue' });
    });

    it('handles special characters in values', () => {
      const result = convertDataAttributes([
        { id: 'url', value: 'https://example.com/test?param=value' },
        { id: 'json', value: '{"key":"value"}' },
        { id: 'spaces', value: 'value with spaces' }
      ]);
      expect(result).toEqual({
        'data-url': 'https://example.com/test?param=value',
        'data-json': '{"key":"value"}',
        'data-spaces': 'value with spaces'
      });
    });

    it('handles mixed types of values', () => {
      const result = convertDataAttributes([
        { id: 'string', value: 'text' },
        { id: 'number', value: 123 },
        { id: 'boolean', value: true },
        { id: 'float', value: 3.14 }
      ]);
      expect(result).toEqual({
        'data-string': 'text',
        'data-number': '123',
        'data-boolean': 'true',
        'data-float': '3.14'
      });
    });

    it('handles zero as a value', () => {
      const result = convertDataAttributes([{ id: 'count', value: 0 }]);
      expect(result).toEqual({ 'data-count': '0' });
    });

    it('handles empty string as a value', () => {
      const result = convertDataAttributes([{ id: 'empty', value: '' }]);
      expect(result).toEqual({ 'data-empty': '' });
    });

    it('preserves kebab-case in attribute ids', () => {
      const result = convertDataAttributes([
        { id: 'my-custom-attr', value: 'value' }
      ]);
      expect(result).toEqual({ 'data-my-custom-attr': 'value' });
    });

    it('handles duplicate ids by keeping last value', () => {
      const result = convertDataAttributes([
        { id: 'duplicate', value: 'first' },
        { id: 'duplicate', value: 'second' }
      ]);
      expect(result).toEqual({ 'data-duplicate': 'second' });
    });
  });
});
