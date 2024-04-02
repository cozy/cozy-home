import React from 'react'

import useCustomWallpaper from './useCustomWallpaper'

const CustomWallPaperContext = React.createContext<
  CustomWallPaperContextInterface | undefined
>(undefined)

interface CustomWallPaperContextInterfaceData {
  wallpaperLink: string | null
  binaryCustomWallpaper: string | null
}
interface CustomWallPaperContextInterface {
  data: CustomWallPaperContextInterfaceData
  fetchStatus: string
}
export const CustomWallPaperProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const data = useCustomWallpaper() as CustomWallPaperContextInterface
  return (
    <CustomWallPaperContext.Provider value={data}>
      {children}
    </CustomWallPaperContext.Provider>
  )
}

export const useCustomWallpaperContext =
  (): CustomWallPaperContextInterface => {
    const context = React.useContext(CustomWallPaperContext)
    if (context === undefined) {
      throw new Error(
        'useCustomWallpaperContext must be used within a CustomWallpaperProvider'
      )
    }
    return context
  }
