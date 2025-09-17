module.exports = {
	globDirectory: 'dist/',
	globPatterns: ['**/*.{html,js,css}'],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};

// Update cache version to clear old cache on new version
const CACHE_NAME = 'my-cache-v1';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
