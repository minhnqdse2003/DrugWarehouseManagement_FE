import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';


let port: number;

if (process.env.NODE_ENV === 'production') {
  port = process.env.VITE_PRODUCTION_PORT
    ? parseInt(process.env.VITE_PRODUCTION_PORT, 10)
    : 3000;
} else {
  port = process.env.VITE_PORT
    ? parseInt(process.env.VITE_PORT, 10)
    : 3000;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@tests': path.resolve(__dirname, 'src/tests')
    }
  },
  server: {
    port
  },
})
