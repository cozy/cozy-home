/* global cozy */

import styles from 'styles/konnectorSuccess'

import classNames from 'classnames'
import has from 'lodash/has'
import sortBy from 'lodash/sortBy'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'
import AppLinker from 'cozy-ui/react/AppLinker'

import DescriptionContent from 'components/DescriptionContent'
import TriggerFolderLink from 'components/TriggerFolderLink'
import connectingIllu from 'assets/images/connecting-data-in-progress.svg'

const SuccessImage = () => (
  <div className={styles['col-account-success-illu-wrapper']}>
    <img src={connectingIllu} className={styles['col-account-success-illu']} />
  </div>
)

const SuccessLinks = ({ children }) => (
  <p className={classNames(styles['col-account-success-links'], 'u-mv-half')}>
    {children}
  </p>
)

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

const DriveLink = translate()(({ folderId, t }) => (
  <TriggerFolderLink
    folderId={folderId}
    label={t('account.success.driveLinkText')}
  />
))

const SuccessFooter = translate()(({ children }) => (
  <div className={styles['coz-form-controls-success']}>
    <div className={styles['col-account-form-success-buttons']}>{children}</div>
  </div>
))

export class KonnectorSuccess extends Component {
  componentDidMount() {
    if (typeof this.props.handleConnectionSuccess === 'function') {
      this.props.handleConnectionSuccess()
    }
  }

  render() {
    const { account, error, title, messages } = this.props

    const relatedApps = sortBy(Object.values(KonnectorSuccess.apps).filter(app =>
      app.predicate(this.props)
    ), app => -app.priority)

    const hasLinks = relatedApps.length > 0

    return (
      account && (
        <div className={styles['col-account-success']}>
          {!error && <SuccessImage />}
          <DescriptionContent
            title={!error && title}
            messages={!error && messages}
          >
            {hasLinks && (
              <SuccessLinks>
                {relatedApps.map(x => x.successLink(this.props, this.context))}
              </SuccessLinks>
            )}
          </DescriptionContent>

          <SuccessFooter>
            {relatedApps[0].footerLink(this.props, this.context)}
          </SuccessFooter>
        </div>
      )
    )
  }
}

KonnectorSuccess.apps = {
  drive: {
    priority: 1,
    predicate: props => {
      const trigger = props.trigger
      return has(trigger, 'message.folder_to_save')
    },
    successLink: props => {
      return <DriveLink folderId={props.trigger.message.folder_to_save} />
    },
    footerLink: props => {
      const { t, onDone, account, successButtonLabel } = props
      return (
        <Button
          label={successButtonLabel || t('account.success.button')}
          onClick={event => {
            event.preventDefault()
            onDone(account)
          }}
        />
      )
    }
  },

  banks: {
    priority: 0,
    predicate: props => {
      const connector = props.connector
      return (
        Array.isArray(connector.data_types) &&
        connector.data_types.includes('bankAccounts')
      )
    },
    successLink: (props, context) => {
      return <BanksLink banksUrl={context.store.banksUrl} />
    },
    footerLink: () => null
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

export {
  SuccessImage,
  SuccessLinks,
  BanksLink,
  DriveLink
}

export default translate()(KonnectorSuccess)
