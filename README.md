[![Build Status](https://travis-ci.org/urturn/urturn-expression-api.png?branch=master)](https://travis-ci.org/urturn/urturn-expression-api)

# Changelogs

## 1.0.2
- ADDED Post.dialog('users'...) to display a list of users (who voted what?)
- ADDED Post.dialog('image', {preferredFormat:'jpeg'}) try to make jpeg from your png image in order to reduce the size
- ADDED dialog('XX', {label: "Search cats video!"}) -> display a custom placeholder in the chooser search field
-- ADDED ut-image, ut-audio and ut-video component support this through options.i18n.dialogLabel
- ADDED @mention in post send mention notifications if fields are indexed
- ADDED UT.Expression.apiVersion() and UT.Expression.version() added.
- FIX tons of improvement in the text-widgets
- FIX minor fixes

## 1.0.0
- ADDED components
- ADDED http://developers.urturn.com
- ADDED showcases

## 0.9.2
- FIX : Multiples bugs

## 0.9.1
- FIX : Multiple bugs

## 0.9.0
- ADDED : Urturn components
- FIX : Multiple bugs

## 0.8.2
- FIX: ready event triggered twice if registered after edit.

## 0.8.1
- NEW: Video data added

## 0.8.0
- NEW: Use scroll() to get the current scroll position and scroll({top: 123}) or scroll({bottom: 0}) to scroll to specific positions.
- NEW: Added the method UT.Post.queueUp(name, callback) that will retrieve the next available number in the sequence name.
- NEW: Expression starting from 0.8.0 must support to be resized in width at runtime.
- NEW: use size() to retrieve the current size.
- REFACTOR: Listen on 'scroll' instead of 'scrollChanged' to get notified when the scroll has been updated.
- REFACTOR: use size(args) instead of resize(args) to resize the post.
- REFACTOR: post.size() and post.scroll() now accept an optional callback that will be triggered once the operation complete. The global events post.on('scroll') and post.on('resize') will be called as well as before.
- FIX: scroll event is fixed.
- FIX: post.users('current') now have valid numberOfPost and numberOfUse values (notes that there might be some delays to the update).

## 0.7.5
- FIX: fixed a bug where parent data collection was preventing expression loading on mobile.

## 0.7.2
- FIX: context use indiferently 'editor' or 'edit'. Now use 'editor' or 'player' syntax.

## 0.7.1

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

## 0.6.3

- FIX: a bug where .dialog callback was not called when user close the library

## 0.6.2

- FIX: a bug that prevent .on('media') to work correctly with bookmarklet. 

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

## Build Process

We use Grunt to build the package and bower to manage our internal dependencies. Every dependencies must have a valid bower.json file that will list their main resources.

## License

Copyright Webdoc Inc. 2012, all rights reserved
