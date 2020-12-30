const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.config.js');
const Dotenv = require('dotenv-webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[fullhash].js',
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [ 
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      defaults: path.resolve(__dirname, './.env'),
      path: path.resolve(__dirname, './.env.production')
    }),
  ],
  optimization: {
    minimizer: [
      // new UglifyJsPlugin(),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp:/\.css$/g,
        cssProcessor:require("cssnano"),
        cssProcessorPluginOptions:{
          preset:['default', { discardComments: { removeAll:true } }]
        },
        canPrint:true
      })
    ],
  }
});
