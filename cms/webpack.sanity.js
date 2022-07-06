const path = require("path");

const { isString } = require("lodash/fp");

const isBabelRule = (rule) =>
  Boolean(
    rule.use &&
      !isString(rule.use) &&
      "loader" in rule.use &&
      rule.use.loader?.includes("babel-loader")
  );

module.exports = ({ module: { rules = [], ...module } = {}, ...config }) => ({
  ...config,
  module: {
    ...module,
    rules: rules.flatMap((rule) =>
      !isBabelRule(rule)
        ? [rule]
        : [
            rule,
            {
              ...rule,
              test: /\.mjs(\?|$)/,
              exclude: /bower_components/,
              include: [path.resolve(__dirname, "node_modules/zod/lib")],
            },
          ]
    ),
  },
});
