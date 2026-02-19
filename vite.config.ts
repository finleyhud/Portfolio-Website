import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    // IMPORTANT: This must match your GitHub repository name exactly.
    // If your repo is https://github.com/finleyhud/Portfolio-Website
    // then this must be '/Portfolio-Website/'
    base: '/Portfolio-Website/', 
    define: {
      // Polyfill process.env.API_KEY so the Google GenAI SDK works
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  };
});