import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import critters from 'astro-critters';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
    site: 'https://www.jupascalculator.app',
    vite: {
        resolve: {
            alias: {
                '@shared-config': path.resolve(__dirname, 'shared-config')
            }
        }
    },
    integrations: [
        react(),
        sitemap({
            filter: (page) => !page.includes('/admin/') && !page.includes('/api/'),
        }),
        critters()
    ],
    build: {
        inlineStylesheets: 'auto',
    },
});
