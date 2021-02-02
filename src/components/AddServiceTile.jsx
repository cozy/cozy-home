import React from 'react'
import { withClient } from 'cozy-client'
import Icon from 'cozy-ui/transpiled/react/Icon'
import AppLinker, { generateWebLink } from 'cozy-ui/transpiled/react/AppLinker'
import palette from 'cozy-ui/stylus/settings/palette.json'

import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'

const AddServiceTile = ({ label, client }) => {
  const nativePath = '/discover/?type=konnector'
  const slug = 'store'
  const cozyURL = new URL(client.getStackClient().uri)
  const { cozySubdomainType: subDomainType } = client.getInstanceOptions()

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
        <a
          onClick={onClick}
          href={href}
          className="item item--ghost item--add-service"
        >
          <div className="item-icon">
            <Icon icon={PlusIcon} size={16} color={palette['dodgerBlue']} />
          </div>
          <span className="item-title">{label}</span>
        </a>
      )}
    </AppLinker>
  )
}

export default withClient(AddServiceTile)
