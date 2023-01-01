const { defineConfig } = require('vite');
const path = require('path');

module.exports = defineConfig({
  base: '',
  build: {
    optimizeDeps: {
      include: ['chance'],
    },
    chunkSizeWarningLimit: 600,
    cssCodeSplit: false,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      src: path.resolve(__dirname, './src'),
      styles: path.resolve(__dirname, './styles'),
    },
  },
});
