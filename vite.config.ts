import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { updateGeneratedManifestVersion } from './plugins/updateGeneratedManifestVersion';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), updateGeneratedManifestVersion()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        popup: resolve(__dirname, 'popup.html'),
        options: resolve(__dirname, 'options.html'),
      },
    },
  },
})
