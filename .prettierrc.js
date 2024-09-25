'use strict';

module.exports = {
  arrowParens: 'always',
  proseWrap: 'always',
  trailingComma: 'none',
  singleQuote: true,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    },
    { files: '*.svelte', options: { parser: 'svelte' } }
  ]
};
