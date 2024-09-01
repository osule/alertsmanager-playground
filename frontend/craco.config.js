const { addBeforeLoader, loaderByName } = require("@craco/craco");
const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.extensions.push(".tmpl");
      const tmplExtensionRegExp = /\.tmpl$/i;

      const tmplLoader = {
        test: tmplExtensionRegExp,
        use: "raw-loader",
        include: path.resolve(__dirname, "src"),
      };
      const rule = webpackConfig.module.rules.find(
        (rule) => rule.oneOf?.length > 0
      );

      rule.oneOf = [tmplLoader, ...rule.oneOf];
      return webpackConfig;
    },
  },
};
