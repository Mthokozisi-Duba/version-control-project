/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public/index.html'), to: path.resolve(__dirname, 'dist/public/index.html') },
        { from: path.resolve(__dirname, 'public/style.css'), to: path.resolve(__dirname, 'dist/public/style.css') }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist/public'),
    },
    historyApiFallback: true,
  }
};
