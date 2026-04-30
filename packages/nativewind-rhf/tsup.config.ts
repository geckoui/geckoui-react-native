import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: [
    'react',
    'react-native',
    'react-hook-form',
    'nativewind',
    '@geckoui/nativewind',
    'class-variance-authority',
    'tailwind-merge',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic';
    options.jsxImportSource = 'nativewind';
  },
});
