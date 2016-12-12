const {
  addPlugins, createConfig, entryPoint, env, setOutput, sourceMaps, webpack,
} = require('@webpack-blocks/webpack2');

const babel = require('@webpack-blocks/babel6');
const devServer = require('@webpack-blocks/dev-server2');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env || 'development'),
  }),
  new CopyWebpackPlugin([
    { from: 'manifest.json' },
    { from: 'icons/icon19x.png' },
    { from: 'icons/icon38x.png' },
  ]),
];

const productionPlugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: true },
    screwIe8: true,
  }),
];

module.exports = createConfig([
  entryPoint('./src/index.js'),
  setOutput('./build/bundle.js'),
  babel(),
  addPlugins(basePlugins),
  env('development', [
    sourceMaps(),
    devServer(),
  ]),
  env('production', [
    addPlugins(productionPlugins),
  ]),
]);
