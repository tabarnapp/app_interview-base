const path = require('path');
const webpack = require('webpack');

const disable_minify = true;

module.exports = {
  mode: (disable_minify) ? "development" : "production",
  target: "web",
  entry: {
    'app_base_interview': './index.js'
  },
  output: {
    filename: (disable_minify) ? '[name].js' : '[name].js',
    path: path.resolve(__dirname, '../adminApp/public/themeScripts/build'),
    // libraryTarget: 'browser'
  },
  resolve: {
    modules: [
      "node_modules"
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
  },

  module: {
    rules: [{
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }, {
          loader: "eslint-loader",
          options: {
            configFile: "./.eslintrc"
          }
        }],
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  node: {
    console: true,
  },
//   externals: {
//     _: '_',
//   },
  performance: { hints: false },
  plugins: [
    new webpack.DefinePlugin({
      'APP_ID': JSON.stringify("app_interview")
    }),
    new webpack.ProvidePlugin({
    //   tdebug: 'debug',
      '_':'lodash',
      'request': 'xhr-request',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
//     new WrapperPlugin({
//       test: /\.js$/, // only wrap output of bundle files with '.js' extension 
//       header: 'window.React = window.React || {}; window.ReactDOM = window.ReactDOM || {};',
//     }),
  ]

};