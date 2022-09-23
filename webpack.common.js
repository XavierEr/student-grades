const { resolve } = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.tsx',

  output: {
    chunkFilename: '[name].[chunkhash:8].bundle.js',
    filename: '[name].[fullhash:8].bundle.js',
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
    new HtmlWebpackPlugin({ title: 'Student Grades', template: resolve(__dirname, 'public/index.html') })
  ]
}

module.exports = config;