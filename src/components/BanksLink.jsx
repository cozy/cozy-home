import React from 'react'

import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import Icon from 'cozy-ui/transpiled/react/Icon'
import styles from 'styles/konnectorSuccess.styl'
import OpenwithIcon from 'cozy-ui/transpiled/react/Icons/Openwith'

import { useI18n } from 'cozy-ui/transpiled/react'
import { useClient } from 'cozy-client'
import Intents from 'cozy-interapp'

const BanksLink = ({ banksUrl }) => {
  const { t } = useI18n()
  const client = useClient()
  const intents = new Intents({ client })
  return banksUrl ? (
    <AppLinker app={{ slug: 'banks' }} href={banksUrl}>
      {({ href, onClick, name }) => (
        <a
          className={styles['col-account-success-link']}
          href={href}
          target="_top"
          onClick={onClick}
        >
          <Icon className="u-mr-half" icon={OpenwithIcon} />
          {t('account.success.banksLinkText', {
            appName: name
          })}
        </a>
      )}
    </AppLinker>
  ) : (
    <a
      className={styles['col-account-success-link']}
      onClick={() =>
        intents.redirect('io.cozy.apps', { slug: 'banks' }, url => {
          window.top.location.href = url
        })
      }
    >
      <Icon className="u-mr-half" icon={OpenwithIcon} />
      {t('account.success.banksLinkText')}
    </a>
  )
}

export default BanksLink
