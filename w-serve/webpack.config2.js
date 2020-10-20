const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `webpackbundle.js`
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: './dist',
    port: 8081,
    contentBase: __dirname,
    open: true

    /* open: true,
    hotOnly: true, */
    /* proxy: {
      '/api': {
        target: '***'
      }
    } */
  },
  mode: "development"
}