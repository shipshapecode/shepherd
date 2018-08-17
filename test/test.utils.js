/* global window,require,describe,it */
import { assert } from 'chai';
import {
  isObject,
  isUndefined
} from '../src/js/utils';

describe('Shepherd', function() {
  describe('Utils', function() {
    describe('isObject', function() {
      it('returns correct values', function() {
        assert.isOk(isObject({}), 'isObject is true for {}');
        assert.isNotOk(isObject([]), 'isObject is false when []');
      });
    });

    describe('isUndefined', function() {
      it('returns correct values', function() {
        const defined = 'defined';
        assert.isOk(isUndefined(undefined));
        assert.isNotOk(isUndefined(defined));
      });
    });
  });
});