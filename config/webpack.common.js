const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  /**
   * Webpack will look at main.js for the entry point of the app.
   */
  entry: [path.join(__dirname, "../src", "/client", "/main.js")],

  /**
   * The directory where webpack will output the bundled app to.
   */
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].bundle.js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      /**
       * Fonts
       *
       * Inline font files.
       */
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "fonts/[name].[ext]",
        },
      },
    ],
  },

  resolve: {
    // Folder mappings
    extensions: ["*", ".js", ".jsx", ".vue"],
    alias: {
      "@store": path.resolve(__dirname, "../src/client/store"),
      "@utils": path.resolve(__dirname, "../src/client/utils"),
      "@views": path.resolve(__dirname, "../src/client/views"),
      "@assets": path.resolve(__dirname, "../src/client/assets"),
      "@components": path.resolve(__dirname, "../src/client/components"),
    },
  },

  plugins: [
    /**
     * This plugin clones any other rule that has been defined
     * and applies it to the corresponding language block in vue fields.
     */
    new VueLoaderPlugin(),
    /**
     * Clean build folder when rebuilding
     */
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
  ],
};
