import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourceImg = 'C:/Users/ijjij/.gemini/antigravity/brain/7636268e-31a1-47ff-9f5c-c92f8770c7d1/.user_uploaded/media_1790523822274.jpg'

// Synchronously copy to public/ and generate self-contained profilePic.js
try {
  if (fs.existsSync(sourceImg)) {
    // 1. Copy to public/madhu.jpg
    const publicDest = path.resolve(__dirname, 'public/madhu.jpg')
    fs.copyFileSync(sourceImg, publicDest)

    // 2. Copy to src/assets/madhu.jpg
    const assetsDir = path.resolve(__dirname, 'src/assets')
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true })
    fs.copyFileSync(sourceImg, path.resolve(assetsDir, 'madhu.jpg'))

    // 3. Write inlined base64 export to src/profilePic.js for 100% bulletproof loading
    const buf = fs.readFileSync(sourceImg)
    const base64Data = `data:image/jpeg;base64,${buf.toString('base64')}`
    fs.writeFileSync(
      path.resolve(__dirname, 'src/profilePic.js'),
      `// Auto-generated portrait image for Ijji Madhu Venkat\nexport const profilePic = ${JSON.stringify(base64Data)};\nexport default profilePic;\n`
    )
  }
} catch (err) {
  console.error('[vite.config.js] Profile image sync error:', err)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-user-image',
      configureServer(server) {
        server.middlewares.use('/madhu.jpg', (req, res, next) => {
          if (fs.existsSync(sourceImg)) {
            res.setHeader('Content-Type', 'image/jpeg')
            fs.createReadStream(sourceImg).pipe(res)
            return
          }
          next()
        })
      }
    }
  ],
  server: {
    fs: {
      strict: false,
      allow: ['..', 'C:/Users/ijjij/']
    }
  }
})
