/**
 * An video object return by create('video');
 * Use it to manipulate a video (crop and filters comming in futur)
 * @param {object} videoDescriptor an object return by internal sdk
 */
UT.Video = function(videoDescriptor) {

	/**
	 * The url of the video
	 * @type {String}
	 */
	this.url = "";

	/**
	 * A string containing the type of this media,
	 * Aka "video" here
	 * @type {String}
	 */
	this.type = 'video';

	this.toJSON = function(){
		descriptor.url = this.url;
		descriptor._type = 'video';
		descriptor.appData = this.appData;
		return descriptor;
	};

	// Private methods
	// LOOK AWAY!
	// Use to on this interface with Urturn API
	function _buildVideo(videoDescriptor) {
		this.url = videoDescriptor.url;
		this.appData = videoDescriptor.appData;
		descriptor = videoDescriptor;
	}
	var descriptor = {};
	// init !
	_buildVideo.call(this, videoDescriptor);
};