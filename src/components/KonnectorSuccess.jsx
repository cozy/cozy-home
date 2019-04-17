/* global cozy */

import styles from 'styles/konnectorSuccess'

import classNames from 'classnames'
import has from 'lodash/has'
import React, { Component } from 'react'

import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'

import DescriptionContent from 'components/DescriptionContent'
import TriggerFolderLink from 'components/TriggerFolderLink'
import connectingIllu from 'assets/images/connecting-data-in-progress.svg'

export class KonnectorSuccess extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store
  }

  componentDidMount() {
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
      title,
      messages,
      onDone,
      successButtonLabel,
      trigger
    } = this.props
    const { banksUrl } = this.store
    const displayDriveUrl = has(trigger, 'message.folder_to_save')
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
              <p
                className={classNames(
                  styles['col-account-success-links'],
                  'u-mv-half'
                )}
              >
                {displayDriveUrl && (
                  <TriggerFolderLink
                    folderId={trigger.message.folder_to_save}
                    label={t('account.success.driveLinkText')}
                  />
                )}
                {displayBanksUrl &&
                  (banksUrl ? (
                    <a
                      className={styles['col-account-success-link']}
                      href={banksUrl}
                      target="_parent"
                    >
                      <Icon className="u-mr-half" icon="openwith" />
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
                      <Icon className="u-mr-half" icon="openwith" />
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
