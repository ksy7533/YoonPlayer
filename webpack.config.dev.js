const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/js/index.js'],
  mode: "development",
  devtool: 'inline-source-map',
  output: {
    filename: 'js/yoonPlayer.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'YoonPlayer',
  },
  devServer: {
    contentBase: path.resolve("./dist"),
    index: "index.html",
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader','css-loader','sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader:'file-loader',
        options: {
          publicPath: './dist',
          name: '[name].[ext]?[hash]',
        }
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader:'url-loader',
        options: {
          publicPath: './dist',
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      inject: 'head', // script 삽입위치
    }),
  ]
};