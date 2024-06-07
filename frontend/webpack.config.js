const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: [/node_modules/, /__tests__/],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|ttf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    port: 3000,
    allowedHosts: ['localhost'],
    historyApiFallback: true,
  },
  plugins: [
    new CompressionPlugin({
      include: /\/images\/.*\.(png|jpg|jpeg|webp|js|jsx|css|woff|ttf)$/,
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /dev\.js$/,
    }),
  ],
};