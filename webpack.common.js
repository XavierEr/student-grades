const { resolve } = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  entry: './src/index.tsx',

  output: {
    chunkFilename: '[name].[chunkhash:8].bundle.js',
    filename: '[name].[fullhash:8].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.txt$/i,
        use: ['raw-loader']
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ title: 'Student Grades', template: resolve(__dirname, 'public/index.html') }),
    new CopyPlugin({
      patterns: [
        { from: resolve(__dirname, 'public/favicon.ico'), to: resolve(__dirname, 'dist') },
        { from: resolve(__dirname, 'public/manifest.json'), to: resolve(__dirname, 'dist') },
        { from: resolve(__dirname, 'public/logo192.png'), to: resolve(__dirname, 'dist') },
        { from: resolve(__dirname, 'public/logo512.png'), to: resolve(__dirname, 'dist') }
      ]
    })
  ]
}

module.exports = config;