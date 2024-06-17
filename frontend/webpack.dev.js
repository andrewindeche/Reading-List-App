const { merge } = require('webpack-merge');
const dotenv = require('dotenv');

dotenv.config();

const common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './',
    port: process.env.PORT,
    hot: true,
  },
});
