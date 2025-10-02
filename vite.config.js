import { defineConfig } from 'vite'

export default defineConfig({
  root: './public',
  base: '/',
  build: {
    outDir: '../build',
    sourcemap: true,
    minify: 'esbuild'
  }
});