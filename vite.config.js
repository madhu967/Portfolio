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

// Copy newly uploaded resume to public/resume.pdf
try {
  const resumeSource = 'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1791200239005.pdf';
  if (fs.existsSync(resumeSource)) {
    fs.copyFileSync(resumeSource, path.resolve(__dirname, 'public/resume.pdf'));
  }
} catch (err) {
  console.error('[vite.config.js] Resume sync error:', err);
}

// Copy SmartCity project images
try {
  const smartCityImages = [
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790945349468.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790945377469.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790945482790.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790945514386.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790945542583.png'
  ];
  const scDir = path.resolve(__dirname, 'public/smartcity');
  if (!fs.existsSync(scDir)) fs.mkdirSync(scDir, { recursive: true });
  smartCityImages.forEach((img, i) => {
    if (fs.existsSync(img)) {
      fs.copyFileSync(img, path.resolve(scDir, `slide${i + 1}.png`));
    }
  });
} catch (err) {
  console.error('[vite.config.js] SmartCity sync error:', err);
}

// Copy Prescripto project images
try {
  const prescriptoImages = [
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1791200378887.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790945948340.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790945997179.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790946017996.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790946052707.png'
  ];
  const pDir = path.resolve(__dirname, 'public/prescripto');
  if (!fs.existsSync(pDir)) fs.mkdirSync(pDir, { recursive: true });
  prescriptoImages.forEach((img, i) => {
    if (fs.existsSync(img)) {
      fs.copyFileSync(img, path.resolve(pDir, `slide${i + 1}.png`));
    }
  });
} catch (err) {
  console.error('[vite.config.js] Prescripto sync error:', err);
}

// Copy Portfolio project images
try {
  const portfolioImages = [
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790946255820.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790946277929.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790946311875.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790946334166.png'
  ];
  const portDir = path.resolve(__dirname, 'public/portfolio');
  if (!fs.existsSync(portDir)) fs.mkdirSync(portDir, { recursive: true });
  portfolioImages.forEach((img, i) => {
    if (fs.existsSync(img)) {
      fs.copyFileSync(img, path.resolve(portDir, `slide${i + 1}.png`));
    }
  });
} catch (err) {
  console.error('[vite.config.js] Portfolio sync error:', err);
}

// Copy QuickBlog project images
try {
  const quickBlogImages = [
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790954366898.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790954397164.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790954425682.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1790954468077.png'
  ];
  const qbDir = path.resolve(__dirname, 'public/quickblog');
  if (!fs.existsSync(qbDir)) fs.mkdirSync(qbDir, { recursive: true });
  quickBlogImages.forEach((img, i) => {
    if (fs.existsSync(img)) {
      fs.copyFileSync(img, path.resolve(qbDir, `slide${i + 1}.png`));
    }
  });
} catch (err) {
  console.error('[vite.config.js] QuickBlog sync error:', err);
}

// Copy Forever project images
try {
  const foreverImages = [
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1791137401714.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1791137431343.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1791137480332.png',
    'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1791137506398.png'
  ];
  const foreverDir = path.resolve(__dirname, 'public/forever');
  if (!fs.existsSync(foreverDir)) fs.mkdirSync(foreverDir, { recursive: true });
  
  foreverImages.forEach((img, i) => {
    if (fs.existsSync(img)) {
      fs.copyFileSync(img, path.resolve(foreverDir, `slide${i + 1}.png`));
    }
  });

  const foreverLogo = 'C:/Users/ijjij/.gemini/antigravity/brain/9a141dc8-3d2a-4917-8831-3d0b397d09c7/.user_uploaded/media_1791137557933.png';
  if (fs.existsSync(foreverLogo)) {
    fs.copyFileSync(foreverLogo, path.resolve(foreverDir, 'logo.png'));
  }
} catch (err) {
  console.error('[vite.config.js] Forever sync error:', err);
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
