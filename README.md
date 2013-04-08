Current Version : 0.6.1 

[Read the doc](http://webdoc.github.com/urturn-expression-api)

Or join us on IRC (#urturn on freenode)

# Changelogs

## 0.7.0-alpha

- REFACTOR UT.Collection / UT.PublicCollection: Collection and PublicCollection
  are now two different classes given the fact their roles are indeed very differrent.
- ADD: UT.PublicCollection.find() retrieve the most recent item of the collection.
  This open the door to a whole new kind of expression where viewer items are used directly
  rather than with their comments.
- ADD: UT.User, representing a user
- ADD: UT.Post#users([items], callback) a method that retrieve an array of 
  UT.User for a given array of items, the current user when 'current' is given as
  first parameter or an UT.User instance if only one item is given.
- ADD: UT.Post#isOwner(user) return true if the given user is the post owner
- ADD: UT.Post#isCurrentUser(user) return true if the given user is the current user

## 0.6.1

- ADD User API: let you retrieve information on current user.
- ADD: support for new UT.Image(URL) : let you create an UT.Image form an url.
- ADD: pause event on post, called when post is hedded and media should pause.
- FIXED : Multiple bugs in user collection
- Fix a bug where array cannot be serialized
- Fix a bug where items with null value was not fully removed
- Fix a bug where undefined items was not removed
- Fix a bug where setting an item to null was throwing an exception on save (issue #8381)
- Fix a bug where storage was accepting functions, now throw an Error
- Better tests of collections sanitization method
- Refactor the tests to avoid using public collections for everything

## 0.6.0

- Implements the 'flat API'.

## 0.5.2

- add a new method to get Parent Document data when use Urturn. Use expression.getParentData() to get parent document data. Return an empty object if no data are set.

## 0.5.1

- new method signature for Post#textInput([options], [callback]) where options support keys value, max and multiline, and callback receive the resulting string or null if none are typed.


## License

Copyright Webdoc Inc. 2012, all rights reserved
