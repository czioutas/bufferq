// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Served as a GitHub Pages project page at czioutas.github.io/bufferq —
// update `site`/`base` if the repo is renamed or moved to a custom domain.
export default defineConfig({
  site: 'https://czioutas.github.io',
  base: '/bufferq',
  trailingSlash: 'always',

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});
