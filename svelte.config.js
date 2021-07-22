import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    // optimize the build for netlify
    adapter: netlify(),
    files: {
      lib: 'src',
    },
    prerender: {
      crawl: true,
      enabled: true,
      force: true,
      pages: ['*'],
    },
  },
};

export default config;
