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

// Copy about portrait image
try {
  const aboutImgSource = 'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790861924093.png';
  if (fs.existsSync(aboutImgSource)) {
    fs.copyFileSync(aboutImgSource, path.resolve(__dirname, 'public/about-portrait.png'));
  }
} catch (err) {
  console.error('[vite.config.js] About image sync error:', err);
}

// Copy certificates to public/certificates
try {
  const localCerts = [
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790847635663.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790847719622.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790859316388.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790859347019.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790845785592.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790845844986.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790845909054.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790845872313.png'
  ];
  const certsDir = path.resolve(__dirname, 'public/certificates');
  if (!fs.existsSync(certsDir)) fs.mkdirSync(certsDir, { recursive: true });
  localCerts.forEach((certPath, i) => {
    if (fs.existsSync(certPath)) {
      const ext = path.extname(certPath);
      fs.copyFileSync(certPath, path.resolve(certsDir, `cert${i + 1}${ext}`));
    }
  });
} catch (err) {
  console.error('[vite.config.js] Certs sync error:', err);
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
