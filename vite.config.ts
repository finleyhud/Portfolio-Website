import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    // 'base: "/"' is used for custom domains (e.g. finhudsonportfolio.com).
    // If you remove the custom domain later, change this back to './'
    base: '/', 
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