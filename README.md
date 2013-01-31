[warning]: http://gambasdoc.org/img/warning.png  "Warning"

Copyright Webdoc Inc. 2012, all rights reserved

urturn-expression-api
=====================

Javascript Urturn Expression API.

* This will be the next API version. 
* Current alpha release is private and hidden in webdoc server.
* Follow this project if you are interested in developping expression for urturn.com


# The expression object

## Methods

Methods of the expression object are asynchronous, becuase ultimately they must communicate with Urturn via the postMessage API. 


#### .create( _url_, _options_ )

> It is undecided whether we are able to determine the type of media object to generate from the url alone.


#### .dialog( _type_, _options_ )

```js
exp.dialog('image', options)
.done(function(imageObj) {
  // Do something
})
.fail(function(message) {
  // Log error
})
```

#### .height( _value_ ) ![][warning]

> The name of this method is undecided.
* .height()
* .size()


#### .proxify( _url_ )

#### .publishable( _boolean_ ) ![][warning]

> The name of this method is undecided.
* .publishable()
* .readyToPost()
* .postable()


#### .save()



## Properties

#### .node

#### .storage

#### .url

#### .environment

####
