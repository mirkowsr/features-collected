import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  tsconfig: 'tsconfig.build.json',
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
})
