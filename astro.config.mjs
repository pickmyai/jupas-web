import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import critters from 'astro-critters';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
    site: 'https://jupascalculator.app',
    vite: {
        resolve: {
            alias: {
                '@shared-config': path.resolve(__dirname, 'shared-config')
            }
        }
    },
    integrations: [
        tailwind(),
        react(),
        sitemap({
            i18n: {
                defaultLocale: 'zh-HK',
                locales: {
                    'zh-HK': 'zh-HK',
                    'zh-TW': 'zh-TW',
                    'zh-CN': 'zh-CN',
                    'en': 'en',
                }
            },
            filter: (page) => !page.includes('/admin/') && !page.includes('/api/'),
        }),
        critters()
    ],
    build: {
        inlineStylesheets: 'auto',
    },
});
