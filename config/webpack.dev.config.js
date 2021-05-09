const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');

const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { definitions } = new Dotenv();
const API_BASE_URL = JSON.stringify(definitions['process.env.API_BASE_URL']);

// 分析打包时间
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 3001,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://80.240.22.42/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [ 
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")//使用dart-sass代替node-sass
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      defaults: path.resolve(__dirname, './.env'),
      path: path.resolve(__dirname, './.env.development')
    })
  ]

}));
