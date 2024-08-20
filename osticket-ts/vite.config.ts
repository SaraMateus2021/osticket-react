import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/upload/api/http.php', // URL da API backend
        changeOrigin: true, // Para alterar o cabeçalho Origin
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' do caminho
      },
    },
  },
})
