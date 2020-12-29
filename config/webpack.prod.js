const path = require("path");
const { merge } = require("webpack-merge");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  /**
   * Enables development optimizations.
   */
  mode: "production",

  /** No source maps in production */
  devtool: false,

  module: {
    rules: [
      /**
       * Styles (development)
       *
       * Load into files instead of injecting into the head.
       */
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "sass-loader",
        ],
      },
      /**
       * Image handling for production
       * The image webpack loader optimizes images
       */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
          "image-webpack-loader",
        ],
      },
    ],
  },

  plugins: [
    /**
     * MiniCSSExtractPlugin
     *
     * Extracts CSS into separate files.
     */
    new MiniCssExtractPlugin({
      filename: "styles/[name].[hash].css",
      chunkFilename: "styles/[name].[id].[hash].css",
      ignoreOrder: false,
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/client/public/index.html"),
      favicon: path.join(__dirname, "../src/client/public/favicon.ico"),
      title: "Codice",
      hash: true, //useful for cache busting
    }),

    new webpack.SourceMapDevToolPlugin({
      exclude: ["/node_modules/"],
    }),
  ],

  /**
   * Performance
   *
   * Set max asset sizes but do not show additional hints on production build.
   */
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  /**
   * Optimization
   *
   * Production minimizing of JavaSvript and CSS assets.
   */
  // optimization: {
  //   minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     // Cache vendors since this code won't change very often
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/](vue|axios)[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
});
