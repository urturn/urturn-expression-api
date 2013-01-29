var config = module.exports;

config["API tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    'lib/expression-api/core.js',
    'lib/expression-api/uuid.js',
    'lib/expression-api/item-collection.js',
    'lib/expression-api/item-collection-store.js',
    'lib/expression-api/container.js',
    'lib/expression-api/medias.js',
    'lib/expression-api/document.js',
    'lib/expression-api/url.js'
  ],
  tests: [
    "test/*-test.js"
  ]
};