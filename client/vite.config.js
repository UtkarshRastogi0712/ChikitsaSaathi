import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    Pages({
      // options here
      pagesDir: 'src/pages',
      extensions: ['jsx']
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
