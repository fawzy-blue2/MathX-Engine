import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: '@fawzy-blue2/mathix-engine',
      fileName: 'mathix',
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});