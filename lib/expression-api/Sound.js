/**
 * A sound object return by create('sound');
 * Use it to manipulate a sound (filter, ...)
 * @param {object} soundDescriptor an object return by internal sdk
 */
UT.Sound = function(soundDescriptor) {
	
	/**
	 * Name of the service in wich this sound is hosted
	 * Currently soundcloud or itunes
	 * @type {String}
	 */
	this.service = '';
	
	/**
	 * url of the sound on the service
	 * @type {String}
	 */
	this.url = '';

	

}