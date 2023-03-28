import { useState, useEffect } from 'react'

const useHomeAppOpened = () => {
  const [previousOpenAppState, setPreviousOpenAppState] = useState('')
  const [openAppState, setOpenAppState] = useState('')

  const homeJustOpenedOnFlagshipApp =
    openAppState === 'closeApp' && previousOpenAppState !== 'closeApp'

  const homeJustQuitOnFlagshipApp =
    openAppState !== 'closeApp' && previousOpenAppState === 'closeApp'

  useEffect(() => {
    window.addEventListener('openApp', () => {
      setPreviousOpenAppState(openAppState)
      setOpenAppState('openApp')
    })
    window.addEventListener('closeApp', () => {
      setPreviousOpenAppState(openAppState)
      setOpenAppState('closeApp')
    })
  }, [openAppState])

  return {
    homeJustOpenedOnFlagshipApp,
    homeJustQuitOnFlagshipApp
  }
}

export default useHomeAppOpened
