import React, { useState } from 'react'

import flag from 'cozy-flags'
import { useClient, generateWebLink } from 'cozy-client'
import AppLinker from 'cozy-ui-plus/dist/AppLinker'
import SquareAppIcon from 'cozy-ui-plus/dist/SquareAppIcon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import styles from '@/styles/lists.styl'
import ShortcutCreateModal from './Shortcuts/ShortcutCreateModal'

const ShortcutAddTile = () => {
  const { t } = useI18n()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

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

const StoreAddTile = () => {
  const client = useClient()
  const { t } = useI18n()
  const nativePath = '/discover'
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
        <a onClick={onClick} href={href} className={styles['scale-hover']}>
          <SquareAppIcon name={t('add_service')} variant="add" />
        </a>
      )}
    </AppLinker>
  )
}

/**
 * AddTile component.
 *
 * @returns {JSX.Element} The rendered AddTile component.
 */
const AddTile = ({ apps }) => {
  const shouldDisplayShortcutAddTitle = flag('home.add-tile.add-shortcut')

  if (shouldDisplayShortcutAddTitle) {
    return <ShortcutAddTile />
  }

  const hiddenApps = flag('apps.hidden') || []
  const isStoreInstalled = apps.find(({ slug }) => slug === 'store')
  const isStoreHidden = hiddenApps.includes('store')
  const shouldDisplayStoreAddTitle = isStoreInstalled && !isStoreHidden

  if (shouldDisplayStoreAddTitle) {
    return <StoreAddTile />
  }

  return null
}

export default AddTile
