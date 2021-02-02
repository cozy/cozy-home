/* global cozy */

import React from 'react'

import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import styles from 'styles/konnectorSuccess.styl'

import OpenwithIcon from 'cozy-ui/transpiled/react/Icons/Openwith'

const BanksLink = translate()(({ banksUrl, t }) =>
  banksUrl ? (
    <AppLinker slug="banks" href={banksUrl}>
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
        cozy.client.intents.redirect('io.cozy.apps', { slug: 'banks' }, url => {
          window.top.location.href = url
        })
      }
    >
      <Icon className="u-mr-half" icon={OpenwithIcon} />
      {t('account.success.banksLinkText')}
    </a>
  )
)

export default BanksLink
