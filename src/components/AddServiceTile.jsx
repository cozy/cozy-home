import React from 'react'
import { useClient } from 'cozy-client'
import AppLinker, { generateWebLink } from 'cozy-ui/transpiled/react/AppLinker'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

const AddServiceTile = ({ label }) => {
  const client = useClient()
  const nativePath = '/discover/?type=konnector'
  const slug = 'store'
  const cozyURL = new URL(client.getStackClient().uri)
  const { subdomain: subDomainType } = client.getInstanceOptions()

  return (
    <AppLinker
      slug={'store'}
      nativePath={nativePath}
      href={generateWebLink({
        cozyUrl: cozyURL.origin,
        slug,
        nativePath,
        subDomainType
      })}
    >
      {({ onClick, href }) => (
        <a onClick={onClick} href={href}>
          <SquareAppIcon name={label} variant="add" />
        </a>
      )}
    </AppLinker>
  )
}

export default AddServiceTile
