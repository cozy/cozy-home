/* global cozy */

import React from 'react'

import AppLinker from 'cozy-ui/react/AppLinker'
import Icon from 'cozy-ui/react/Icon'
import { translate } from 'cozy-ui/react/I18n'
import styles from 'styles/konnectorSuccess'

const BanksLink = translate()(
  ({ banksUrl, t }) =>
    banksUrl ? (
      <AppLinker slug="banks" href={banksUrl}>
        {({ href, onClick, name }) => (
          <a
            className={styles['col-account-success-link']}
            href={href}
            target="_parent"
            onClick={onClick}
          >
            <Icon className="u-mr-half" icon="openwith" />
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
          cozy.client.intents.redirect(
            'io.cozy.apps',
            { slug: 'banks' },
            url => {
              window.top.location.href = url
            }
          )
        }
      >
        <Icon className="u-mr-half" icon="openwith" />
        {t('account.success.banksLinkText')}
      </a>
    )
)

export default BanksLink
