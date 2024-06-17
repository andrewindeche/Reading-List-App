const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.jsx',
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
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
        include: [
          path.resolve(__dirname, 'frontend/images'),
        ],
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
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
    new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      include: /\/assets\/.*\.(png|jpg|jpeg|webp|js|jsx|css|woff|ttf)$/,
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /dev\.js$/,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'assets'), to: 'assets/images' },
      ],
    }),
  ],
};
