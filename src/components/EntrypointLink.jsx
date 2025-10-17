import React from 'react'

import { useClient, generateWebLink } from 'cozy-client'

import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import Link from 'cozy-ui/transpiled/react/Link'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const EntrypointLink = ({ entrypoint }) => {
  const client = useClient()
  const { lang } = useI18n()

  const cozyUrl = client.getStackClient().uri
  const { subdomain: subDomainType } = client.getInstanceOptions()

  const entrypointUrl = generateWebLink({
    cozyUrl,
    subDomainType,
    slug: entrypoint.slug,
    pathname: '/',
    hash: entrypoint.hash
  })

  const title = entrypoint.title[lang] || entrypoint.title['en']

  return (
    <Link
      underline="none"
      href={entrypointUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="scale-hover"
    >
      <SquareAppIcon
        name={title}
        variant="shortcut"
        IconContent={
          <div className="u-w-2 u-h-2">
            <img
              className="u-bdrs-5"
              src={`data:image/svg+xml;base64,${entrypoint.icon}`}
              width={32}
              height={32}
            />
          </div>
        }
        hideShortcutBadge={true}
      />
    </Link>
  )
}

export default EntrypointLink
