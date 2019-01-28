const { addBabelPlugin } = require("customize-cra");
const path = require("path");

function override(config, env) {
  return config;
}

module.exports = override(
  addBabelPlugin('styled-jsx/babel')
);
