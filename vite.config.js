import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import seo from './vite-plugins/seo.js'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), seo()],
    build: {
        // three.js (+ the 3D hero scene) is a lazy chunk; it is expected to be large.
        chunkSizeWarningLimit: 1300,
    },
})
