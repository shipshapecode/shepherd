'use strict';

module.exports = {
  arrowParens: 'always',
  proseWrap: 'always',
  trailingComma: 'none',
  singleQuote: true,
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
