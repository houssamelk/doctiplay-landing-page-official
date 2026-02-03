import { defineConfig } from 'vite'

export default defineConfig({
    base: '/pitch/',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    }
})
