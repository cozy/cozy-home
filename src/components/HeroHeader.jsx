import React from 'react'
import PropTypes from 'prop-types'
import { withClient } from 'cozy-client'
import Button from 'cozy-ui/react/Button'
import get from 'lodash/get'
import { withBreakpoints } from 'cozy-ui/transpiled/react'
import { translate } from 'cozy-ui/react/I18n'
import useInstanceSettings from 'hooks/useInstanceSettings'
import useCustomWallpaper from 'hooks/useCustomWallpaper'

const HeroHeader = ({ t, client, breakpoints: { isMobile } }) => {
  const {
    fetchStatus,
    data: { wallpaperLink }
  } = useCustomWallpaper(client)
  const rootURL = client.getStackClient().uri
  const { host } = new URL(rootURL)
  let backgroundURL = null
  if (fetchStatus !== 'loading')
    backgroundURL =
      wallpaperLink || `${rootURL}/assets/images/default-wallpaper.jpg`

  const { data: instanceSettings } = useInstanceSettings(client)
  const publicName = get(instanceSettings, 'public_name', '')

  return (
    <header
      className="hero-header"
      style={{ backgroundImage: `url(${backgroundURL})` }}
    >
      <div className="corner">
        <Button
          label={t('app.logout')}
          icon="logout"
          size="small"
          theme="text"
          className="corner-button"
          iconOnly={isMobile}
          extension={isMobile ? 'narrow' : null}
          onClick={async () => {
            await client.logout()
            window.location.reload()
          }}
        />
      </div>
      <div>
        <img className="hero-avatar" src={`${rootURL}/public/avatar`} />
      </div>
      <h1 className="hero-title">{publicName}</h1>
      <h2 className="hero-subtitle">{host}</h2>
    </header>
  )
}

HeroHeader.propTypes = {
  t: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  breakpoints: PropTypes.shape({
    isMobile: PropTypes.bool
  }).isRequired
}

export default withClient(withBreakpoints()(translate()(HeroHeader)))
