import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.puppybreeder.pro',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  integrations: [react(), icon(), sitemap()],
  vite: {
    resolve: {
      alias: { '@': new URL('./src', import.meta.url).pathname },
    },
  },
});