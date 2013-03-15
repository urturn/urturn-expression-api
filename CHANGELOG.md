0.6.1
=====
- Fix a bug where array cannot be serialized
- Fix a bug where items with null value was not fully removed
- Fix a bug where undefined items was not removed
- Fix a bug where setting an item to null was throwing an exception on save (issue #8381)
- Fix a bug where storage was accepting functions, now throw an Error
- Better tests of collections sanitization method
- Refactor the tests to avoid using public collections for everything

0.6.0
=====

- Implements the 'flat API'.

0.5.2
=====

- add a new method to get Parent Document data when use Urturn. Use expression.getParentData() to get parent document data. Return an empty object if no data are set.

0.5.1
=====

- new method signature for Post#textInput([options], [callback]) where options support keys value, max and multiline, and callback receive the resulting string or null if none are typed.