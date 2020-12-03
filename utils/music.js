const klasa = require('klasa');

module.exports = {

	// Export everything from Klasa
	...klasa,

	// Lib/structures
	MusicCommand: require('/home/container/utils/structures/MusicCommand'),
	MusicManager: require('/home/container/utils/structures/MusicManager'),

	util: require('./lib/util/util'),

	config: require('../config'),

	// Export Klasa's util as klasaUtil
	klasaUtil: klasa.util
};