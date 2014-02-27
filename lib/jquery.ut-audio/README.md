Changelog
0.1.36
----------------
* fixed player for iOS7

0.1.35
----------------
* fixed bottom-over skin
* updated example
* auto open dialog while remove content

0.1.33
----------------
* fixed "bottom-over" skin
* fixed "utAudio:dialogCancel" event

0.1.32
----------------
* fixed mediaAdd, mediaRemove events

0.1.31
----------------
* added listening 'sound' event
* added listenMedia command and style

0.1.30
----------------
* destroy command remove storage data now
* added utAudio:buttonClick events
* added events utAudio:mediaAdd, utAudio:mediaRemove, utAudio:mediaReady
* added support for additional parameters for .utVideo(‘dialog’, {...}); specify for current dialog
* added events utAudio:dialogOpen, utAudio:dialogCancel
* disable native iOS selection
* added style "autoPause" to prevent pause playing while another player is starting
* chnaged data in utAudio:ready event, now is {id:id, data:data}

0.1.1
----------------
* .utAudio('dialog') command added (accepts {"fastQuit":true} parameter)
* 'utAudio:dialogclose' event added
