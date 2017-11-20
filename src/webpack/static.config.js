const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

module.exports = {
  context: path.resolve(__dirname, '../'),

  devtool: isProd ? 'hidden-source-map' : 'source-map',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts?$/,
        exclude: ['node_modules'],
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.resolve(__dirname, '../typescript/tsconfig.json'),
            },
          },
          { loader: 'source-map-loader' },
          {
            loader: 'tslint-loader',
            options: {
              configFile: path.resolve(__dirname, '../typescript/tslint.json'),
            },
          },
        ],
      },

      {
        test: /\.html$/,
        loader: 'html-loader',
      },

      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Typescript Webpack Starter',
      template: '!!ejs-loader!src/index.html',
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true,
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true,
        },
      },
    }),
  ],

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
}
