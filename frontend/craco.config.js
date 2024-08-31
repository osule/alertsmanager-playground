const { addBeforeLoader, loaderByName } = require("@craco/craco");
const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.extensions.push(".txt");
      const txtExtensionRegExp = /\.txt$/i;

      const txtLoader = {
        test: txtExtensionRegExp,
        use: "raw-loader",
        include: path.resolve(__dirname, "src"),
      };
      const rule = webpackConfig.module.rules.find(
        (rule) => rule.oneOf?.length > 0
      );

      rule.oneOf = [txtLoader, ...rule.oneOf];
      return webpackConfig;
    },
  },
};
