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
          "@models": './src/server/models',
          "@config": './src/server/config',
          "@processing": './src/server/processing',
          "@utils": './src/server/utils'
        }
      }
    ]
  ]
}