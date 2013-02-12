var config = {};

config["API tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    'dist/iframe.min.js'
  ],
  tests: [
    "test/*-test.js"
  ]
};

module.exports = config;