import React from 'react'
import { useClient, generateWebLink } from 'cozy-client'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

/**
 * AddTile component.
 *
 * @returns {JSX.Element} The rendered AddTile component.
 */
const AddTile = () => {
  const client = useClient()
  const nativePath = '/discover'
  const slug = 'store'
  const cozyURL = new URL(client.getStackClient().uri)
  const { subdomain: subDomainType } = client.getInstanceOptions()
  const { t } = useI18n()

  return (
    <AppLinker
      app={{ slug: 'store' }}
      nativePath={nativePath}
      href={generateWebLink({
        pathname: '/',
        cozyUrl: cozyURL.origin,
        slug,
        hash: nativePath,
        subDomainType
      })}
    >
      {({ onClick, href }) => (
        <a onClick={onClick} href={href} className="scale-hover">
          <SquareAppIcon name={t('add_service')} variant="add" />
        </a>
      )}
    </AppLinker>
  )
}

export default AddTile
