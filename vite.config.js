import { createRequire } from 'module';
import react from '@vitejs/plugin-react';
import elmPlugin from 'vite-plugin-elm';
import { getClientEnvironment } from './config/env';
import paths from './config/paths';

const require = createRequire(import.meta.url);

const defineConfig = () => {
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

  return {
    plugins: [
      react({
        jsxRuntime: 'classic'
      }),
      elmPlugin({
        nodeElmCompilerOptions: {
          pathToElm: require.resolve('elm/bin/elm')
        }
      })
    ],
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
    test: {
      globals: true,
      environment: 'jsdom',
      root: 'src',
      setupFiles: ['../vitest-setup.js'],
    }
  };
};

export default defineConfig;