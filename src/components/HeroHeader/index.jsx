import React from 'react'
import { useClient } from 'cozy-client'
import { useInstanceSettings } from 'hooks/useInstanceSettings'
import cx from 'classnames'

import { makeStyles } from 'cozy-ui/transpiled/react/styles'
import Typography from 'cozy-ui/transpiled/react/Typography'

const useStyles = makeStyles(theme => ({
  shadow: {
    boxShadow: theme.shadows[2]
  }
}))

export const HeroHeader = () => {
  const client = useClient()
  const classes = useStyles()
  const rootURL = client.getStackClient().uri
  const { host } = new URL(rootURL)

  const { instanceSettings } = useInstanceSettings(client)
  const publicName = instanceSettings?.['public_name'] || '\u00A0'

  return (
    <header className="hero-header u-pos-relative u-flex u-flex-column u-flex-justify-center u-flex-items-center u-flex-shrink-0 u-bxz">
      <div>
        <img
          className={cx('hero-avatar u-mb-1 u-mb-half-s', classes.shadow)}
          aria-hidden="true"
          src={`${rootURL}/public/avatar`}
        />
      </div>
      <Typography
        variant="h1"
        className="hero-title u-ta-center u-mv-0 u-mh-1 u-primaryContrastTextColor"
      >
        {publicName}
      </Typography>
      <Typography className="hero-subtitle u-ta-center u-mv-0 u-mh-1 u-primaryContrastTextColor">
        {host}
      </Typography>
    </header>
  )
}

export default HeroHeader
