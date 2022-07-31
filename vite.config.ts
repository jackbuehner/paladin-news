import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const DEV_SERVER_PORT = 4000;

const config: UserConfig = {
  plugins: [sveltekit()],
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
};

export default config;
