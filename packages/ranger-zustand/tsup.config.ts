import type { Options } from 'tsup'
import { defineConfig } from 'tsup'

export default defineConfig((options: Options) => {
  return {
    entry: ['./src/index.ts'],
    outDir: 'dist',
    clean: true,
    dts: true,
    splitting: true,
    shims: true,
    watch: options.watch,
    sourcemap: !!options.watch,
    format: ['esm', 'cjs'],
    external: ['react', 'react-dom'],
    minify: 'terser',
    cjsInterop: true,
    terserOptions: {
      compress: true
    },
    outExtension({ format }) {
      return {
        js: `.${format}.js`
      }
    }
  }
})
