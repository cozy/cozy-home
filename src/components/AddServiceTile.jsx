import React from 'react'
import { useClient, generateWebLink } from 'cozy-client'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

const AddServiceTile = ({ label }) => {
  const client = useClient()
  const nativePath = '/discover/?type=konnector'
  const slug = 'store'
  const cozyURL = new URL(client.getStackClient().uri)
  const { subdomain: subDomainType } = client.getInstanceOptions()

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
          <SquareAppIcon name={label} variant="add" />
        </a>
      )}
    </AppLinker>
  )
}

export default AddServiceTile
