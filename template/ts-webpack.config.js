const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
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
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    contentBase: "public",
    host: "localhost"
  }
};

