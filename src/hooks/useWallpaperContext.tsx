import React from 'react'
import useWallpaper from './useWallpaper'

const WallPaperContext = React.createContext<
  WallPaperContextInterface | undefined
>(undefined)

interface WallPaperContextInterfaceData {
  wallpaperLink: string | null
  binaryCustomWallpaper: string | null
  isCustomWallpaper: boolean
}
interface WallPaperContextInterface {
  data: WallPaperContextInterfaceData
  setWallpaperLink: (link: string | null) => void
  returnToDefaultWallpaper: () => void
  fetchStatus: string
  clearCustomWallpaper: () => void
  saveCustomWallpaper: (file: File) => Promise<void>
}
export const WallPaperProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const value = useWallpaper() as WallPaperContextInterface

  return (
    <WallPaperContext.Provider value={value}>
      {children}
    </WallPaperContext.Provider>
  )
}

export const useWallpaperContext = (): WallPaperContextInterface => {
  const context = React.useContext(WallPaperContext)
  if (context === undefined) {
    throw new Error(
      'useWallpaperContext must be used within a WallpaperProvider'
    )
  }
  return context
}
