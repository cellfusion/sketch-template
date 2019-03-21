const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  },
  plugins: [
    new HtmlPlugin({template: "public/index.html"})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions:['.js'],
  },
  devServer: {
    contentBase: "public",
    host: "localhost"
  }
};

