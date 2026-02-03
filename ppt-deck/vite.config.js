import { defineConfig } from 'vite'

export default defineConfig({
    base: '/ppt/',
    build: {
        outDir: 'dist',
        emptyOutDir: true, // Clean docs before build
    }
})
