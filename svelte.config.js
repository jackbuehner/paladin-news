import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import 'dotenv/config';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // optimize the build for netlify
    adapter: vercel({
      edge: false,
      external: [],
      split: false,
    }),
    files: {
      lib: 'src',
    },
  },
};

export default config;
