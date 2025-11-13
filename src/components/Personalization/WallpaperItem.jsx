import React from 'react'
import cx from 'classnames'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Circle from 'cozy-ui/transpiled/react/Circle'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import CrossIcon from 'cozy-ui/transpiled/react/Icons/Cross'
import { useCozyTheme } from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import styles from './Wallpaper.styl'
import {
  getWallpaperSrc,
  getWallpaperAlt,
  getWallpaperLabel
} from './wallpaperUtils'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

export const WallpaperItem = ({
  wallpaper,
  isSelected,
  binaryCustomWallpaper,
  onSelect,
  onRemove
}) => {
  const { type } = useCozyTheme()
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const src = getWallpaperSrc(wallpaper, binaryCustomWallpaper, type)
  const alt = getWallpaperAlt(wallpaper, t)
  const label = getWallpaperLabel(wallpaper, t, binaryCustomWallpaper)
  const hasCustomWallpaper =
    wallpaper.role === 'import' && binaryCustomWallpaper

  const className = cx(
    styles['wallpaperItem'],
    styles['wallpaperItem--' + type],
    {
      [styles['wallpaperItem--selected']]: isSelected
    },
    'u-c-pointer u-ov-hidden u-pos-relative u-bdrs-6'
  )

  const labelColor = hasCustomWallpaper
    ? undefined
    : wallpaper.role === 'import'
    ? 'primary'
    : 'textSecondary'

  const labelStyle = wallpaper.labelColor
    ? { color: wallpaper.labelColor }
    : hasCustomWallpaper
    ? { color: 'white' }
    : undefined

  return (
    <div className={className} onClick={onSelect}>
      {src && <img className={styles['wallpaperImage']} src={src} alt={alt} />}
      {hasCustomWallpaper && (
        <>
          <div
            className={cx(styles['wallpaperOverlay'], 'u-o-20 u-w-100 u-h-100')}
          />
          <Circle
            backgroundColor={'var(--primaryColor)'}
            className={cx(
              'u-pos-absolute',
              isMobile ? 'u-top-0 u-right-0' : 'u-top-xs u-right-xs u-o-40'
            )}
            size={isMobile ? 'small' : undefined}
          >
            <IconButton
              size="small"
              className="u-p-0"
              onClick={async e => {
                e.stopPropagation()
                await onRemove()
              }}
            >
              <Icon
                icon={CrossIcon}
                size={12}
                color={isMobile ? 'var(--white)' : 'var(--black)'}
              />
            </IconButton>
          </Circle>
        </>
      )}

      <Typography
        variant="caption"
        className={styles['wallpaperLabel']}
        color={labelColor}
        style={labelStyle}
      >
        {label}
      </Typography>
    </div>
  )
}
