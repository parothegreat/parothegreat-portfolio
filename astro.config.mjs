import { defineConfig } from 'astro/config';

export default defineConfig({
  // Enable SSR
  output: 'static',
  integrations: [],
  vite: {
    ssr: {
      external: ['sharp']
    }
  }
});
