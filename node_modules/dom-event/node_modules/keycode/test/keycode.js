var keycode = require('keycode')
var assert = require('timoxley-assert')
it('is commutative', function() {
	var count = 0
	for (var key in keycode.codes) {
		assert.strictEqual(key, keycode(keycode(key)))
		count++
	}
	console.debug('Tested %d keys', count)
})
it('can expose maps', function () {
	var count = 0
	for (var name in keycode.codes) {
		assert.strictEqual(name, keycode.names[keycode.codes[name]])
		count++
	}
	console.debug('Tested %d keys', count)
})