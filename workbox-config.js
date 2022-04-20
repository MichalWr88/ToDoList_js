module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{html,js,css}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};