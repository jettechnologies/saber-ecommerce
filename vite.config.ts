import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import reactSlider from 'react-slider';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  build: {
    rollupOptions: {
      external: ['@babel/runtime', reactSlider],
    },
  },
},
})
