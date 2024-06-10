const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
<<<<<<< HEAD
const publicPath = process.env.PUBLIC_PATH || '/';
const CopyWebpackPlugin = require('copy-webpack-plugin');
=======
const TerserPlugin = require('terser-webpack-plugin');
>>>>>>> b305bd4 (lazy load imports)

module.exports = {
  entry: {
    main: './src/index.jsx',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: publicPath,
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
<<<<<<< HEAD
        include: [
          path.resolve(__dirname, 'frontend/images')
        ],
        type: 'asset/resource',  
        generator: {
            filename: 'images/[name].[hash][ext]',
        },
=======
        use: ['file-loader'],
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
            },
          },
        ],
>>>>>>> b305bd4 (lazy load imports)
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
