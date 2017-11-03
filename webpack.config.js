const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const srcDir = path.resolve(__dirname, 'src');
const buildDir = path.resolve(__dirname, 'dist');

const entryFile = srcDir + '/index.js';
const htmlIndexTemplate = srcDir + '/index.tpl.html';
const bundleName = 'bundle.js';

module.exports = {
  entry: entryFile,
  output: {
    filename: bundleName,
    path: buildDir
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        // include: Condition(s) (optional),
        // exclude: Condition(s) (optional),
        // options: {
        //   ignoreLinks: Condition(s) (optional),
        //   ignorePathReWrite: Condition(s) (optional),
        //   processStyleLinks: Boolean (optional),
        //   htmlLoader: Object (optional)
        // },
        use: [
          'babel-loader',
          'polymer-webpack-loader',
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      template: htmlIndexTemplate,
      title: 'Polymer 2',
      manifest: '/manifest.json'
    })
  ]
};
