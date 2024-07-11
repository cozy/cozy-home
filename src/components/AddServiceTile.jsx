import React from 'react'
import { useClient, generateWebLink } from 'cozy-client'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'

/**
 * AddServiceTile component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the service tile.
 * @param {string} [props.category] - The category of the service tile.
 * @returns {JSX.Element} The rendered AddServiceTile component.
 */
const AddServiceTile = ({ label, category }) => {
  const client = useClient()
  const nativePath = `/discover/?type=konnector${
    category ? `&category=${category}` : ''
  }`
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
