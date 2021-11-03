import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid'
import AppLinker, { generateWebLink } from 'cozy-ui/transpiled/react/AppLinker'
import { useClient } from 'cozy-client'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import { useI18n } from 'cozy-ui/transpiled/react'

const CandidateCategoryTile = ({ slugs, category }) => {
  const { t } = useI18n()
  const client = useClient()
  const cozyURL = new URL(client.getStackClient().uri)
  const app = 'store'
  const nativePath = `/discover?type=konnector&category=${category}`
  const { subdomain: subDomainType } = client.getInstanceOptions()

  return (
    <AppLinker
      slug={app}
      nativePath={nativePath}
      href={generateWebLink({
        cozyUrl: cozyURL.origin,
        slug: app,
        nativePath,
        subDomainType
      })}
    >
      {({ onClick, href }) => (
        <a onClick={onClick} href={href} className="item item--ghost">
          <div className="item-icon-wrapper">
            <Grid container spacing={0} className="item-icon">
              {slugs.map(slug => (
                <Grid item xs={6} key={slug}>
                  <AppIcon
                    alt={t('app.logo.alt', { name: category })}
                    app={slug}
                    className="item-grid-icon"
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <h3 className="item-title">{t(`category.${category}`)}</h3>
        </a>
      )}
    </AppLinker>
  )
}

CandidateCategoryTile.propTypes = {
  slugs: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired
}

export default CandidateCategoryTile
