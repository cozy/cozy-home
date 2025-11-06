import React from 'react'
import { useClient } from 'cozy-client'
import { useInstanceSettings } from '@/hooks/useInstanceSettings'
import cx from 'classnames'
import flag from 'cozy-flags'

import Avatar from 'cozy-ui/transpiled/react/Avatar'
import { useCozyTheme } from 'cozy-ui-plus/dist/providers/CozyTheme'
import { makeStyles } from 'cozy-ui/transpiled/react/styles'
import Typography from 'cozy-ui/transpiled/react/Typography'

const useStyles = makeStyles(theme => {
  return {
    title: {
      lineHeight: '28px',
      letterSpacing: 0.35,
      color:
        theme.type === 'light'
          ? 'rgba(28, 27, 31, 1)'
          : 'rgba(255, 255, 255, 1)'
    },
    nameInverted: {
      textShadow: theme.textShadows[1]
    },
    hostInverted: {
      textShadow: theme.textShadows[1]
    }
  }
})

export const HeroHeader = () => {
  const client = useClient()
  const classes = useStyles()
  const theme = useCozyTheme()
  const rootURL = client.getStackClient().uri

  const { instanceSettings } = useInstanceSettings(client)
  const publicName = instanceSettings?.['public_name'] || '\u00A0'

  const displayName = flag('home.display-url-in-hero-header')
    ? new URL(rootURL).host
    : publicName

  return (
    <header className="hero-header u-pos-relative u-flex u-flex-column u-flex-justify-center u-flex-items-center u-flex-shrink-0 u-bxz">
      <Avatar
        className="u-mb-half"
        size="xl"
        src={`${rootURL}/public/avatar?fallback=initials`}
      />
      <Typography
        variant="h3"
        className={cx('u-ta-center u-mv-0 u-mh-1', classes.title, {
          [classes.nameInverted]: theme.variant === 'inverted'
        })}
      >
        {displayName}
      </Typography>
    </header>
  )
}

export default HeroHeader
