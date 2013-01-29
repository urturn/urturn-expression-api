var config = {};

config["API tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    'dist/urturn-expression-api.min.js'
  ],
  tests: [
    "test/*-test.js"
  ]
};

module.exports = config;