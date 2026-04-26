import { defineConfig } from 'tsup';

const external = [
  'react',
  'react-native',
  'nativewind',
  'class-variance-authority',
  'tailwind-merge',
];
const esbuildOptions: Parameters<typeof defineConfig>[0]['esbuildOptions'] = (
  options,
) => {
  options.jsx = 'automatic';
  options.jsxImportSource = 'nativewind';
};

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    external,
    esbuildOptions,
  },
  {
    entry: ['src/**/*.ts', 'src/**/*.tsx'],
    outDir: 'dist/native',
    format: ['esm'],
    bundle: false,
    dts: false,
    clean: false,
    external,
    esbuildOptions,
  },
]);
