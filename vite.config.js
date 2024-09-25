import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/App.jsx'],
            refresh: true,
        }),
        react(),
    ],
    base:"/",
    resolve: {
        alias: {
            '@components': '/resources/js/components',
            '@utils': '/resources/js/utils',
        },
    },
});