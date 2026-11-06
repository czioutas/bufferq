// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Served as a GitHub Pages project page at czioutas.github.io/bufferq —
// update `site`/`base` if the repo is renamed or moved to a custom domain.
export default defineConfig({
  site: 'https://czioutas.github.io',
  base: '/bufferq',

  vite: {
    plugins: [tailwindcss()]
  }
});
