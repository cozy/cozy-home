import React, { useState } from 'react'

import flag from 'cozy-flags'
import { useClient, generateWebLink } from 'cozy-client'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import SquareAppIcon from 'cozy-ui/transpiled/react/SquareAppIcon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import styles from '@/styles/lists.styl'
import ShortcutCreateModal from './Shortcuts/ShortcutCreateModal'
/**
 * AddTile component.
 *
 * @returns {JSX.Element} The rendered AddTile component.
 */
const AddTile = ({ isStoreAvailable }) => {
  const client = useClient()
  const nativePath = '/discover'
  const slug = 'store'
  const cozyURL = new URL(client.getStackClient().uri)
  const { subdomain: subDomainType } = client.getInstanceOptions()
  const { t } = useI18n()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  if (flag('home.add-tile.add-shortcut')) {
    return (
      <>
        <a
          onClick={() => setIsCreateModalOpen(true)}
          className={styles['scale-hover']}
        >
          <SquareAppIcon name={t('add_service')} variant="add" />
        </a>
        {isCreateModalOpen && (
          <ShortcutCreateModal onClose={() => setIsCreateModalOpen(false)} />
        )}
      </>
    )
  }

  if (isStoreAvailable) {
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
          <a onClick={onClick} href={href} className={styles['scale-hover']}>
            <SquareAppIcon name={t('add_service')} variant="add" />
          </a>
        )}
      </AppLinker>
    )
  }

  return null
}

export default AddTile
