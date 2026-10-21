const nodeExternals = require('webpack-node-externals')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')

module.exports = (options, webpack) => ({
  ...options,
  entry: ['webpack/hot/poll?100', options.entry],
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100', /^@repo\/backend-/],
    }),
  ],
  plugins: [
    ...options.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      autoRestart: false,
      name: options.output.filename,
    }),
  ],
})
