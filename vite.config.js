import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.js',
            name: 'MimirExplorer',
            formats: ['es', 'umd'],
            fileName: (format) => (format === 'es' ? 'mimir.es.js' : 'mimir.umd.cjs')
        },
        rollupOptions: {
            external: ['openseadragon', '@google/model-viewer']
        }
    }
});
