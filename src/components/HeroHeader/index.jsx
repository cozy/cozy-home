import React from 'react'
import { useClient } from 'cozy-client'
import get from 'lodash/get'
import useInstanceSettings from 'hooks/useInstanceSettings'

import Typography from 'cozy-ui/transpiled/react/Typography'

export const HeroHeader = () => {
  const client = useClient()
  const rootURL = client.getStackClient().uri
  const { host } = new URL(rootURL)

  const { data: instanceSettings } = useInstanceSettings(client)
  const publicName = get(instanceSettings, 'public_name', '')

  return (
    <header className="hero-header u-pos-relative u-flex u-flex-column u-flex-justify-center u-flex-items-center u-flex-shrink-0 u-bxz">
      <div>
        <img
          className="hero-avatar u-mb-1 u-mb-half-s"
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
