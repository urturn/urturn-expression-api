var config = module.exports;

config["API tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    'lib/expression-api/core.js',
    'lib/expression-api/uuid.js',
    'lib/expression-api/Expression.js',
    'lib/expression-api/Post.js',
    'lib/expression-api/ItemCollection.js',
    'lib/expression-api/ItemCollectionStore.js',
    'lib/expression-api/init.js'
  ],
  tests: [
    "test/*-test.js"
  ]
};