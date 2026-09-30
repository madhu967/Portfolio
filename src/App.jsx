import React, { useState, useEffect } from 'react'
import FashionEditorial from './FashionEditorial'
import CinematicIntro from './CinematicIntro'
import ProjectGallery from './ProjectGallery'

const App = () => {
  const [introDone, setIntroDone] = useState(false)
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  if (hash.startsWith('#/gallery')) {
    const indexStr = hash.split('/')[2] || '0'
    const index = parseInt(indexStr, 10)
    return <ProjectGallery initialIndex={index} onClose={() => window.location.hash = ''} />
  }

  return (
    <>
      <FashionEditorial />
      {!introDone && <CinematicIntro onComplete={() => setIntroDone(true)} />}
    </>
  )
}

export default App
