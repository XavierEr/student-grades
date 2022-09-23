const { resolve } = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = merge(common, {
  output: {
    path: resolve(__dirname, 'docs')
  },

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: resolve(__dirname, 'babel.config.prod.json')
            }
          }
        ]
      },
      {
        test: /\.module\.(sc|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: true, importLoaders: 2 } },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash:8].css', chunkFilename: '[id].[contenthash:8].css' }),
    new CopyPlugin({
      patterns: [
        { from: resolve(__dirname, 'public/favicon.ico'), to: resolve(__dirname, 'docs') },
        { from: resolve(__dirname, 'public/manifest.json'), to: resolve(__dirname, 'docs') },
        { from: resolve(__dirname, 'public/logo192.png'), to: resolve(__dirname, 'docs') },
        { from: resolve(__dirname, 'public/logo512.png'), to: resolve(__dirname, 'docs') }
      ]
    })
  ]
});

module.exports = config;