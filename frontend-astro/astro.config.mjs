import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.puppybreeder.pro',
  integrations: [react(), icon(), sitemap()],
  vite: {
    resolve: {
      alias: { '@': new URL('./src', import.meta.url).pathname },
    },
  },
});