const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/js/index.js'],
  mode: "production",
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'YoonPlayer',
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },'css-loader','sass-loader',
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
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
      chunkFilename: 'style/[id].css',
      ignoreOrder: false,
    }),
  ]
};