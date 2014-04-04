# Ut-Image

Image component for Urturn expressions

[![Build Status](https://travis-ci.org/urturn/jquery.ut-image-panel.png?branch=master)](https://travis-ci.org/urturn/jquery-ut-image-panel)

## Getting Started

Install with [bower][bower-url] to get the dependencies

```bash
bower install git://github.com/urturn/jquery.ut-image-panel.git
```

In your `expression.json` file, add the following dependencies:

```json
{
	...,
	"dependencies": [
		{ "path": "components/urturn-expression-css/css/style_full.css" },
		{ "path": "components/jquery/jquery.js" },
		{ "path": "components/jquery.ut-image/dist/js/jquery.ut-image-panel.js" },
		{ "path": "components/jquery.ut-image/dist/css/jquery.ut-image-panel.css"	}
	],
	...
}
```

Component Usage

```javascript
UT.Expression.ready(function(post) {
  jQuery("#myimage").utImage();
});
```

## Parameters
### Options
#### post
Type: <code>UT.Post object</code>

#### editable
Type: ```Boolean```

#### ui
Type: ```object```

#### data
Type: ```UT.Image or object```

#### styles
Type: ```object```

{ width: 200px, height: 300px }

#### i18n
Type: ```object```

#### filter
Type: ```string```

json filter, more info here: http://urturn.github.io/urturn-expression-api/Image%20Filters

#### dialog
Type: ```object```

### Events:
* ready
* addClick
* editClick
* mediaAdd
* mediaCrop
* mediaRemove
* mediaReady
* focus
* blur
* destroy
* dialogOpen
* dialogCancel
* resize

## Examples
Basic:

```javascript
jQuery("#myimage").utImage();
```

With options:

```javascript
jQuery("#image,#image2").utImage({
	styles: {
		width: 576,
		height: 300,
	  filter: [{"filter":"sepia","parameters":{"strength":"0.86"}}]
	}
})
.on('utImage:ready', function() {
	console.log("Let's go");
}),
.on('utImage:mediaAdd',function() {
	console.log("Image was added by user");
})
.on('utImage:mediaDrop', function() {
	console.log("Image was cropped by user");
}),
.on('utImage:mediaRemove', function() {
	console.log("Image removed by user");
}),
.on('utImage:resize', function(e,size) {
	console.log("Container size changed",size);
});
```

## Dependencies
The dependencies are managed with [Bower][bower-url]
* jQuery >= 1.8.1
* [Urturn API >= 1.1.1](http://urturn.github.io/urturn-expression-api/)
* [Urturn Expression CSS](http://urturn.github.io/urturn-expression-css/)


## Release History
#### 1.1.33
- fixed conflict between scroll and focus

#### 1.1.31
- fixed mediaAdd event: now is not triggered for "update" command

#### 1.1.30
- changed background size to "cover"

#### 1.1.29
- second click for focused ut-image in group-mode is call blur

#### 1.1.27
- fixed "update" command for "groupMode"
- auto set focus for first element
- "add" button always visible, till image absent

#### 1.1.26
- hide "edit" button when scroll by touch

#### 1.1.25
- auto open dialog while remove content

#### 1.1.23
- ui.source changed to false by default

#### 1.1.22
- small fix of reuse params

#### 1.1.21
- fixed reuse params

#### 1.1.19
- fixed detect size for dialog

#### 1.1.18
- fixed detect for crop sizes

#### 1.1.17
- fixed "buttonClick" event (changed to "utImage:buttonClick")

#### 1.1.16
- fixed container detect in "dialog"

#### 1.1.15
- added 'crop' command

#### 1.1.14
- changed detect size while request or crop image

#### 1.1.13
- added listening 'image' event

#### 1.1.12
- added 'listenMedia' style and command to turn on/off listening media event

#### 1.1.9
- fixed "media" event listener

#### 1.1.8
- fixed bug with update image through .utImage({data:...})
- fixed remove command

#### 1.1.7
- fixed error callback for .dialog

#### 1.1.6
- added utImage:change options with 2 parameters (new_data, old_data)

#### 1.1.5
- disable native iOS selection
- addButton, editButton, removeButton events was changed to buttonClick

#### 1.1.3
- changed spin while image loading

#### 1.1.2
- added command "empty" for remove image from element

#### 1.1.1
- added new command "image" -- to receive image object (HTMLImageElement)
- fixed button position after auto resize

#### 1.1.0
- Refactored

#### 0.8.4 - 2013/06/09
- Refactor events trigger utImage:event
- Fix crop edit issue

#### 0.5.4 - 2013/04/19
- Fixed bugs with sizing (refactored the way size is defined)
- Added a loaded event
- Improved unit tests with sizing tests

#### 0.5.0 - 2013/04/13
- rewrite events
- add data('image')
- lots of bugs fixes
- better handling of differents devices / width

[zip]: https://github.com/urturn/jquery.ut-image-panel/archive/master.zip
[bower-url]: https://github.com/twitter/bower
