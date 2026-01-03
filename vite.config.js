import path from 'node:path';
import react from '@vitejs/plugin-react';
import { getClientEnvironment } from './config/env';
import paths from './config/paths';

const defineConfig = ({ mode }) => {
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

  return {
    plugins: [react({
      jsxRuntime: 'classic'
    })],
    define: {
      __PUBLIC_URL__: env.PUBLIC_URL,
      global: {}
    },
    build: {
      outDir: 'build',
      sourcemap: true,
      minify: 'esbuild',
      target: 'esnext',
      manifest: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      root:'src',
      setupFiles: ['./vitest-setup.js'],
    }
  };
};

export default defineConfig;