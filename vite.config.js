import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(['index', 'cardapio', 'programacao', 'galeria', 'contato'].map(name => [name, fileURLToPath(new URL(`./${name}.html`, import.meta.url))])),
    },
  },
});
