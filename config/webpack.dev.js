const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  /**
   * Enables development optimizations.
   */
  mode: "development",

  /** Source map generation. */
  devtool: "eval-source-map",
  module: {
    rules: [
      /**
       * Styles (development)
       *
       * Inject CSS into the head with source maps.
       */
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      /**
       * Image handling for development
       * Copy image files to dist folder.
       */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
        },
      },
    ],
  },

  /**
   * Spin up a server for quick development.
   */
  devServer: {
    // contentBase: path.join(__dirname, '../dist'),
    /** Proxy API in dev mod to different port */
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
    compress: true,
    hot: true,
    port: 3000,
    stats: "errors-warnings",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/client/public/index.html"),
      favicon: path.join(__dirname, "../src/client/public/favicon.ico"),
    }),
  ],
});
