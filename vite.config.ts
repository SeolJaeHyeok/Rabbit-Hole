import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    alias(),
    react(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@lib', replacement: resolve(__dirname, 'src/lib') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@interfaces', replacement: resolve(__dirname, 'src/interfaces') },
      { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
      { find: '@recoil', replacement: resolve(__dirname, 'src/recoil') },
    ],
  },
});
