module.exports = {
  source: './src',
  destination: './esdoc',
  plugins: [
    {
      name: 'esdoc-standard-plugin',
      option: {
        brand: {
          title: 'Shepherd',
          logo: './docs/assets/img/ship-shape-logo.png',
          description: 'Guide your users through a tour of your app.',
          repository: 'https://github.com/shipshapecode/shepherd.git',
        },
      },
    },
    {
      name: 'esdoc-ecmascript-proposal-plugin',
      option: { all: true }
    }
  ]
};
