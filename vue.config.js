const webpack = require("webpack");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/" + "cave.skullnbones.xyz" + "/"
      : "/",

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      fallback: {
        os: false,
        crypto: false,
        fs: false,
        assert: false,
        process: false,
        util: false,
        path: false,
        stream: false,
      },
    },
  },
});
