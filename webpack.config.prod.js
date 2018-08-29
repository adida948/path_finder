const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './client/index.jsx',
  output: {
    path: path.resolve(path.join(__dirname, '/public/')),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
        },
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        MONGO_THETALKS: JSON.stringify(process.env.MONGO_THETALKS),
        ROOT_URL: JSON.stringify(process.env.ROOT_URL),
        SECRET_JWT_KEY: JSON.stringify(process.env.SECRET_JWT_KEY),
        PRIVATE_LOCK: JSON.stringify(process.env.PRIVATE_LOCK),
        SECRET_CRYPTO_KEY: JSON.stringify(process.env.SECRET_CRYPTO_KEY),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
  ],
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ],
    extensions: ['.jsx', '.js', '.scss'],
  },
};
