import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import serveSkillsPlugin from './vite-plugin-serve-skills.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serveSkillsPlugin()],
})
