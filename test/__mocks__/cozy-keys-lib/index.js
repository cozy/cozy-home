import { useEffect } from 'react'
import CipherType from 'cozy-keys-lib/transpiled/CipherType'
import FieldType from 'cozy-keys-lib/transpiled/FieldType'
import UriMatchType from 'cozy-keys-lib/transpiled/UriMatchType'

const VaultUnlocker = ({ children, onUnlock }) => {
  useEffect(() => {
    onUnlock()
  }, [onUnlock])

  return children
}

VaultUnlocker.displayName = 'withI18n(withLocales(withClient(VaultUnlocker)))'

const withVaultClient = Component => Component
const withVaultUnlockContext = Component => Component

export {
  VaultUnlocker,
  CipherType,
  withVaultClient,
  UriMatchType,
  FieldType,
  withVaultUnlockContext
}
