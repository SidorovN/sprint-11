const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const isDev = process.env.NODE_ENV === 'development';
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpack = require('webpack');

module.exports = {
  module: {
    rules: [{ // тут описываются правила
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: { 
          loader: "babel-loader",
        options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties']
        } }, // весь JS обрабатывается пакетом babel-loader
        exclude: /node_modules/ // исключает папку node_modules
            },
        {
          test: /\.css$/i, 
          use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader']
        },
        {
          test: /\.(png|jpg|gif|ico|svg)$/i,
          use: [
            'file-loader?name=./images/[name].[ext]',
            {
              loader: 'image-webpack-loader',
              options: {}
            },
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader?name=./vendor/[name].[ext]'
        }
      ]
    },
  entry: { main: './src/scripts/script' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[chunkhash].js'
    },

    plugins: [  
      new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
                preset: ['default'],
        },
        canPrint: true
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/index.html',
        filename: 'index.html'
      }),
      new WebpackMd5Hash(),      
      new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
    ]
}