import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      // The entry point where your library exports itself
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'ZAxis',
      // UPDATED: Now matches your desired package name
      fileName: 'z-axis-hanser',
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: [],
      output: {
        globals: {},
      },
    },
  },
});