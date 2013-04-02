var config = exports;

config["default"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    'lib/expression-api/namespace.js',
    'lib/expression-api/uuid.js',
    'lib/expression-api/compat.js',
    'lib/expression-api/Expression.js',
    'lib/expression-api/Post.js',
    'lib/expression-api/Collection.js',
    'lib/expression-api/PublicCollection.js',
    'lib/expression-api/CollectionStore.js',
    'lib/expression-api/Image.js',
    'lib/expression-api/Sound.js',
    'lib/expression-api/Video.js',
    'lib/expression-api/events.js',
    'lib/expression-api/init.js'
  ],
  tests: [
    "test/*-test.js"
  ],
  testHelpers: ["test/lib/dom.js","test/lib/collection-fixtures.js"]
};

config.compiled = {
  rootPath: "../",
  environment: "browser",
  sources: [
    'dist/iframe.min.js'
  ],
  tests: [
    "test/*-test.js"
  ],
  testHelpers: ["test/lib/dom.js","test/lib/collection-fixtures.js"]
};