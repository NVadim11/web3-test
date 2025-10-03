import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      '@shared': '/src/app/shared',
      '@pages': '/src/app/pages',
      '@hooks': '/src/app/hooks',
      '@widgets': '/src/app/widgets',
      '@features': '/src/app/features',
      '@config': '/src/app/config',
      '@routes': '/src/app/routes',
      '@app': '/src/app',
      '@entities': '/src/app/entities',
    },
  },
})
