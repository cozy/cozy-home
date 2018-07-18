/* global cozy */

import styles from '../styles/konnectorSuccess'

import React, { Component } from 'react'
import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'

import DescriptionContent from './DescriptionContent'
import connectingIllu from 'assets/images/connecting-data-in-progress.svg'

export class KonnectorSuccess extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store
    if (typeof this.props.handleConnectionSuccess === 'function') {
      this.props.handleConnectionSuccess()
    }
  }

  render() {
    const {
      t,
      connector,
      account,
      error,
      folderId,
      title,
      messages,
      onDone,
      successButtonLabel
    } = this.props
    const { driveUrl, banksUrl } = this.store
    const displayDriveUrl =
      driveUrl &&
      folderId &&
      Array.isArray(connector.data_types) &&
      connector.data_types.includes('bill')
    const displayBanksUrl =
      Array.isArray(connector.data_types) &&
      connector.data_types.includes('bankAccounts')
    const hasLinks = displayDriveUrl || displayBanksUrl
    return (
      account && (
        <div className={styles['col-account-success']}>
          {!error && (
            <div className={styles['col-account-success-illu-wrapper']}>
              <img
                src={connectingIllu}
                className={styles['col-account-success-illu']}
              />
            </div>
          )}
          <DescriptionContent
            title={!error && title}
            messages={!error && messages}
          >
            {hasLinks && (
              <p className={styles['col-account-success-links']}>
                {displayDriveUrl && (
                  <a
                    className={styles['col-account-success-link']}
                    href={`${driveUrl}${folderId}`}
                    target="_parent"
                  >
                    {t('account.success.driveLinkText')}
                  </a>
                )}
                {displayBanksUrl &&
                  (banksUrl ? (
                    <a
                      className={styles['col-account-success-link']}
                      href={banksUrl}
                      target="_parent"
                    >
                      {t('account.success.banksLinkText')}
                    </a>
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
                      {t('account.success.banksLinkText')}
                    </a>
                  ))}
              </p>
            )}
          </DescriptionContent>

          <div className={styles['coz-form-controls-success']}>
            <div className={styles['col-account-form-success-buttons']}>
              <Button
                label={successButtonLabel || t('account.success.button')}
                onClick={event => {
                  event.preventDefault()
                  onDone(account)
                }}
              />
            </div>
          </div>
        </div>
      )
    )
  }
}

export default translate()(KonnectorSuccess)
