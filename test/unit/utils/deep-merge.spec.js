import { deepMerge } from '../../../src/utils/deep-merge';

describe('deepMerge util', function () {
  describe('deepMerge()', () => {
    it('merges existing simple keys in target at the roots', () => {
      const obj1 = { key1: 'value1', key3: 'value3' };
      const obj2 = { key1: 'changed', key2: 'value2' };
      const merged = deepMerge(obj1, obj2);

      expect(merged).toEqual({
        key1: 'changed',
        key2: 'value2',
        key3: 'value3'
      });
    });

    it('merges nested objects into target', () => {
      const obj1 = {
        key1: {
          subkey1: 'value1',
          subkey2: 'value2'
        }
      };
      const obj2 = {
        key1: {
          subkey1: 'changed',
          subkey3: 'added'
        }
      };
      const merged = deepMerge(obj1, obj2);

      expect(merged).toEqual({
        key1: {
          subkey1: 'changed',
          subkey2: 'value2',
          subkey3: 'added'
        }
      });
    });

    it('replaces simple key with nested object in target', () => {
      const obj1 = {
        key1: 'value1',
        key2: 'value2'
      };

      const obj2 = {
        key1: {
          subkey1: 'subvalue1',
          subkey2: 'subvalue2'
        }
      };
      const merged = deepMerge(obj1, obj2);

      expect(merged).toEqual({
        key1: {
          subkey1: 'subvalue1',
          subkey2: 'subvalue2'
        },
        key2: 'value2'
      });
    });

    it('should add nested object in target', () => {
      const obj1 = {
        a: {}
      };
      const obj2 = {
        b: {
          c: {}
        }
      };
      const merged = deepMerge(obj1, obj2);

      expect(merged).toEqual({
        a: {},
        b: {
          c: {}
        }
      });
    });

    it('should clone source and target', () => {
      const obj1 = {
        a: {
          d: 'bar'
        }
      };
      const obj2 = {
        b: {
          c: 'foo'
        }
      };
      const merged = deepMerge(obj1, obj2);

      expect(merged.a).not.toBe(obj1.a);
      expect(merged.b).not.toBe(obj2.b);
    });

    it('should work on array properties', () => {
      const obj1 = {
        key1: ['one', 'two']
      };
      const obj2 = {
        key1: ['one', 'three'],
        key2: ['four']
      };
      const merged = deepMerge(obj1, obj2);

      expect(merged).toEqual({
        key1: ['one', 'two', 'one', 'three'],
        key2: ['four']
      });
    });
  });
});
