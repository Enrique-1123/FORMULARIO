// vite.config.mjs
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

// Nombre exacto de tu repositorio en GitHub
const repositoryName = 'FORMULARIO';

// https://vitejs.dev/config/
export default defineConfig({
    // --- CONFIGURACIÓN PARA GITHUB PAGES ---
    base: process.env.NODE_ENV === 'production' 
        ? `/${repositoryName}/` 
        : '/',
    // --- FIN CONFIGURACIÓN PARA GITHUB PAGES ---

    // Comentado si no es estrictamente necesario. Si tu proyecto lo necesita, descoméntalo.
    // optimizeDeps: {
    //     noDiscovery: true
    // },

    plugins: [
        vue(),
        Components({
            resolvers: [PrimeVueResolver()]
        })
    ], // <--- Asegúrate que esta coma esté aquí si hay más propiedades después

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    } // <--- Este es el cierre de la propiedad 'resolve'

    // ... aquí podrías tener otras configuraciones como 'server' o 'build' si las necesitas
    // Por ejemplo:
    // server: {
    //   port: 3000
    // }
}); // <--- Este es el cierre principal del objeto defineConfig