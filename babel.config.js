module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./'],
        alias: {
          "@models": './src/models',
          "@config": './src/config',
          "@processing": './src/processing'
        }
      }
    ]
  ]
}