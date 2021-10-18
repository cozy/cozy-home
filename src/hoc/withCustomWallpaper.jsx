import useCustomWallpaper from 'hooks/useCustomWallpaper'
import React from 'react'
import { useClient } from 'cozy-client'

/**
 * @function
 * @description HOC to provide custom wallpaper from context as prop
 *
 * @param  {Component} WrappedComponent - wrapped component
 * @returns {Function} - Component that will receive wallpaper as prop
 */
const withCustomWallpaper = WrappedComponent => {
  const Wrapped = props => {
    const client = useClient()
    const {
      fetchStatus,
      data: { wallpaperLink }
    } = useCustomWallpaper(client)
    // @ts-ignore
    return (
      <WrappedComponent
        {...props}
        wallpaperLink={wallpaperLink}
        wallpaperFetchStatus={fetchStatus}
      />
    )
  }
  Wrapped.displayName = `withCustomWallpaper(${WrappedComponent.displayName ||
    WrappedComponent.name})`
  return Wrapped
}

export default withCustomWallpaper
