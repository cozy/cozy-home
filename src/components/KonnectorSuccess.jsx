/* global cozy */

import styles from 'styles/konnectorSuccess'

import classNames from 'classnames'
import has from 'lodash/has'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'
import AppLinker from 'cozy-ui/react/AppLinker'

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

KonnectorSuccess.propTypes = {
  account: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  onDone: PropTypes.func.isRequired,
  successButtonLabel: PropTypes.string.isRequired,
  trigger: PropTypes.object.isRequired
}

export default translate()(KonnectorSuccess)
