jquery.utSticker
==============

A jquery pluggin to create stickers.

A sticker is a dom node that the user will be able to move / rotate and resize.

## Usage :

To display a sticker and let the user play with it :

    $('.sticker').utSticker({id:"my-sticker"});



Changelog
==============
0.9.30
----------------
* fixed saving sticker position on init

0.9.29
----------------
* fixed issue with redraw

0.9.28
----------------
* fixed sticker init

0.9.27
----------------
* added utSticker:dblClick event

0.9.26
----------------
* fixed "preventAutoRemove" style

0.9.25
----------------
* changed min z-index for stickers (now it's 10)

0.9.24
----------------
* refactored mouse and touch events (touch events only for touched device, mouse events for other devices)
* the style "preventEventsBubble" now used for processing all touch events (also it generate click event on object). Use style:{preventEventsBubble:false} if you want to process native touch event.

0.9.20
----------------
* small fix to center icons vertically in IE

0.9.18
----------------
* updated processing click event on sticker and buttons

0.9.16
----------------
* fixed destroy command
* update event processing (the utSticker:click event now use preventDefault and stopPropogation for touch devices)

0.9.14
----------------
* disable native iOS selection
* update data of utSticker:ready event, now is {id:..., data:...}, where id -- string, data - object with position data

0.9.13
----------------
* fixed z-index in editable:false mode, and for new stickers

0.9.12
----------------
* fixed focus and blur events

0.9.10
----------------
* fixed touchmove event handler (added preventDefault for prevent scrolling page on mobile devices)

0.9.9
----------------
* fixed validate size by "update" command
* fixed bounds calculation in IE10
* fixed saving parameters after "update" command
* fixed rotation in IE9

0.9.8
----------------
* changed option's data format (now you can set position by cx|left|right, indents, rotation limits) Check: http://developers.urturn.com/reference/jssdk/jquery_ut_sticker.html for details
* added support for custom buttons
* refactored sticker's mathematics (added processing sticker's bounds (optional) to calculate size and position)
