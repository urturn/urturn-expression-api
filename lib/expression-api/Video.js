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


	// Private methods
	// Use to bind this interface with Urturn API
	this._buildVideo = function(videoDescriptor) {
		this.url = videoDescriptor.url;
		this.videoDescriptor = videoDescriptor;
	}

	// init !
	this._buildVideo(videoDescriptor);
}