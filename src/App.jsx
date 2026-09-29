import React, { useState } from 'react'
import FashionEditorial from './FashionEditorial'
import CinematicIntro from './CinematicIntro'

const App = () => {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <FashionEditorial />
      {!introDone && <CinematicIntro onComplete={() => setIntroDone(true)} />}
    </>
  )
}

export default App
