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
      path.resolve(__dirname, "node_modules"),
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      CommonLib: path.resolve(__dirname, './CommonLib/'),
      CONSTANTS: path.resolve(__dirname,"./CommonConstants"),
    },
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
            presets: ['babel-preset-es2015'].map(require.resolve),
          }
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-es2015'].map(require.resolve),
          }
        }, {
          loader: "eslint-loader",
          options: {
            configFile: "./.eslintrc"
          }
        }],
      },
    ]
  },
  devtool: 'source-map',
  node: {
    console: true,
  },
  externals: {
    _: '_',
  },

  performance: { hints: false },
  plugins: [
    new webpack.DefinePlugin({
      'APP_ID': JSON.stringify("AW") //APP_WARDEN
    }),
    new webpack.ProvidePlugin({
      tdebug: 'debug',
      'request': 'xhr-request',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
//     new WrapperPlugin({
//       test: /\.js$/, // only wrap output of bundle files with '.js' extension 
//       header: 'window.React = window.React || {}; window.ReactDOM = window.ReactDOM || {};',
//     }),
  ]

};