import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 👈 Allows external device (like your mobile) to connect
    port: 5173,       // or any other port you prefer
  },
  plugins: [
    react()
  ],
})
