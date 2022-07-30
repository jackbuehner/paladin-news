import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import 'dotenv/config';

const DEV_SERVER_PORT = 4000;

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
    prerender: {
      crawl: true,
      enabled: true,
      onError: 'continue', //TODO: investigate the best prerender options
      entries: ['*'],
    },
    vite: {
      server: {
        port: DEV_SERVER_PORT,
        strictPort: true, // exit if port already in use

        // configure Vite for HMR with Gitpod.
        hmr: process.env.GITPOD_WORKSPACE_URL
          ? {
              // due to port fowarding, we have to replace
              // 'https' with the forwarded port, as this
              // is the URI created by Gitpod.
              host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '4000-'),
              protocol: 'wss',
              clientPort: 443,
            }
          : true,
      },
    },
  },
};

export default config;
