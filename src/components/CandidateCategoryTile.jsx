import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'cozy-ui/transpiled/react/Grid'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import { useClient, generateWebLink } from 'cozy-client'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

const MIN_SLUGS = 4

const CandidateCategoryTile = ({ slugs, category }) => {
  const { t } = useI18n()
  const client = useClient()
  const cozyURL = new URL(client.getStackClient().uri)
  const app = 'store'
  const nativePath = `/discover?type=konnector&category=${category}`
  const { subdomain: subDomainType } = client.getInstanceOptions()

  if (slugs.length < MIN_SLUGS) return null

  return (
    <AppLinker
      app={{ slug: app }}
      nativePath={nativePath}
      href={generateWebLink({
        pathname: '/',
        cozyUrl: cozyURL.origin,
        slug: app,
        hash: nativePath,
        subDomainType
      })}
    >
      {({ onClick, href }) => (
        <a onClick={onClick} href={href} className="scale-hover u-c-pointer">
          <SquareAppIcon
            variant="ghost"
            name={t(`category.${category}`)}
            IconContent={
              <Grid container spacing={0}>
                {slugs.slice(0, 4).map(slug => (
                  <Grid item xs={6} key={slug}>
                    <AppIcon
                      alt={t('app.logo.alt', { name: category })}
                      app={slug}
                      type="konnector"
                      className="item-grid-icon"
                    />
                  </Grid>
                ))}
              </Grid>
            }
          />
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
