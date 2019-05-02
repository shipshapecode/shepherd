module.exports = {
  source: './src',
  destination: './esdoc',
  index: "./README.md",
  excludes: ['utils'],
  plugins: [
    {
      name: 'esdoc-standard-plugin',
      option: {
        test: {source: "./test", includes: ["\\.spec\\.js$"]},
        brand: {
          title: 'Shepherd',
          logo: './docs/assets/img/ship-shape-logo.png',
          description: 'Guide your users through a tour of your app.',
          repository: 'https://github.com/shipshapecode/shepherd.git'
        }
      }
    },
    {
      name: 'esdoc-ecmascript-proposal-plugin',
      option: { all: true }
    }
  ]
};
