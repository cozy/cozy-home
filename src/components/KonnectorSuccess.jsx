import classNames from 'classnames'
import has from 'lodash/has'
import sortBy from 'lodash/sortBy'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'

import styles from 'styles/konnectorSuccess'
import DescriptionContent from 'components/DescriptionContent'
import TriggerFolderLink from 'components/TriggerFolderLink'
import BanksLink from 'components/BanksLink'
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

    const relatedApps = sortBy(
      Object.values(KonnectorSuccess.apps).filter(app =>
        app.predicate(this.props)
      ),
      app => -app.priority
    )

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
                {relatedApps.map((x, i) =>
                  x.successLink(this.props, this.context, i)
                )}
              </SuccessLinks>
            )}
          </DescriptionContent>

          <SuccessFooter>
            {relatedApps.length > 0
              ? relatedApps[0].footerLink(this.props, this.context)
              : null}
          </SuccessFooter>
        </div>
      )
    )
  }
}

KonnectorSuccess.apps = {
  drive: {
    priority: 1,
    // eslint-disable-next-line react/display-name
    predicate: props => {
      const trigger = props.trigger
      const res = has(trigger, 'message.folder_to_save')
      return res
    },
    // eslint-disable-next-line react/display-name
    successLink: (props, context, i) => {
      return (
        <DriveLink key={i} folderId={props.trigger.message.folder_to_save} />
      )
    },
    // eslint-disable-next-line react/display-name
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
    // eslint-disable-next-line react/display-name
    predicate: props => {
      const connector = props.connector
      return (
        Array.isArray(connector.data_types) &&
        connector.data_types.includes('bankAccounts')
      )
    },
    // eslint-disable-next-line react/display-name
    successLink: (props, context, i) => {
      return <BanksLink key={i} banksUrl={props.store.banksUrl} />
    },
    footerLink: () => null
  }
}

KonnectorSuccess.propTypes = {
  account: PropTypes.object.isRequired,
  error: PropTypes.string,
  title: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  onDone: PropTypes.func.isRequired,
  successButtonLabel: PropTypes.string.isRequired,
  trigger: PropTypes.object.isRequired
}

export { SuccessImage, SuccessLinks, BanksLink, DriveLink }

const provideStoreAsProp = connect(
  null,
  (dispatch, store) => ({ store })
)

export default translate()(provideStoreAsProp(KonnectorSuccess))
