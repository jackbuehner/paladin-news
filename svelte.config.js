import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify';
import 'dotenv/config';

const DEV_SERVER_PORT = 4000;
const HMR_HOST = process.env.GITPOD_WORKSPACE_ID
  ? `${DEV_SERVER_PORT}-${process.env.GITPOD_WORKSPACE_ID}.${process.env.GITPOD_WORKSPACE_CLUSTER_HOST}`
  : undefined;
const HMR_PORT = process.env.GITPOD_WORKSPACE_ID ? 443 : DEV_SERVER_PORT; // gitpod only serves content from 443
const HMR_PROTOCOL = process.env.GITPOD_WORKSPACE_ID ? 'wss' : undefined;

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
      onError: 'continue', //TODO: investigate the best prerender options
      entries: ['*'],
    },
    vite: {
      server: {
        port: DEV_SERVER_PORT,
        strictPort: true, // exit if port already in use
        hmr: {
          protocol: HMR_PROTOCOL,
          host: HMR_HOST,
          port: HMR_PORT,
        },
      },
    },
  },
};

export default config;
