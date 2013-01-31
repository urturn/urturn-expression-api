[warning]: https://access.redhat.com/knowledge/docs/resources/docs/en-US/JBoss_Operations_Network/3.1/html-single/Admin_Setting_up_Monitoring_Alerts_and_Operations/images/warning-icon.png  "Warning"


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

> ![][warning] It is undecided whether we are able to determine the type of media object to generate from the url alone.


#### .dialog( _type_, _options_ )


#### .height( _value_ )

> ![][warning] The name of this method is undecided.
* .height()
* .size()


#### .proxify( _url_ )


#### .publishable( _boolean_ )

> ![][warning] The name of this method is undecided.
* .publishable()
* .readyToPost()
* .postable()


#### .save()



## Properties

#### .environment

```js
{
  player: boolean,
  editor: boolean
}
```

> ![][warning] Another way of doing this would be:
* .mode // 'edit' or 'view'


#### .node


#### .note

> ![][warning] This may be better as a method. Is setting the note async?


#### .storage


#### .title

> ![][warning] This may be better as a method. Is setting the title async?


#### .url


## Comments

Some recommendedations from @dymonaz:

https://twitter.com/stephband/status/296959513662214144


Copyright Webdoc Inc. 2012, all rights reserved
