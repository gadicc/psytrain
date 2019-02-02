const { override, addBabelPlugin, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addBabelPlugin('styled-jsx/babel'),
  addWebpackAlias({
    react: path.resolve('./node_modules/react')
  })
);
