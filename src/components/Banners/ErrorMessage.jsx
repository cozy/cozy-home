import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { isKonnectorTwoFAError } from 'lib/konnectors'
import Button from 'cozy-ui/react/Button'
import PropTypes from 'prop-types'

import Banner from 'components/Banners/Banner'
import { getMostAccurateErrorKey, isKonnectorKnownError } from 'lib/konnectors'

export class ErrorMessage extends Component {
  constructor(props) {
    super(props)
    this.renderButton = this.renderButton.bind(this)
    this.getErrorTitle = this.getErrorTitle.bind(this)
    this.getErrorDescription = this.getErrorDescription.bind(this)
  }

  renderButton(error) {
    const { t, onForceConnection, disabled } = this.props
    if (isKonnectorTwoFAError(error)) {
      return (
        <Button
          label={t('connection.CTA.twofa_failed')}
          icon="sync"
          theme="danger"
          className="u-m-0"
          onClick={onForceConnection}
          disabled={disabled}
        />
      )
    } else {
      return null
    }
  }

  getErrorTitle() {
    const { t, error } = this.props
    return t(
      getMostAccurateErrorKey(t, error, key => `connection.error.${key}.title`)
    )
  }

  getErrorDescription() {
    const { t, konnector, error } = this.props
    return t(
      getMostAccurateErrorKey(
        t,
        error,
        key => `connection.error.${key}.description`
      ),
      {
        name: konnector.name,
        link: konnector.vendor_link
      }
    )
  }

  render() {
    const { t, konnector, error } = this.props

    if (!isKonnectorKnownError(error)) {
      return (
        <Banner
          description={t('connection.error.default.description', {
            name: konnector.name
          })}
          title={t('connection.error.default.title')}
          isImportant
        />
      )
    }

    // FIXME temporarily, only for EDF
    if (konnector.slug === 'edf') {
      return (
        <Banner
          description={t('status.edf.maintenance', {
            supportLink: t('status.edf.support_link')
          })}
          title={t('status.interrupted')}
          isImportant
        />
      )
    }

    return (
      <Banner
        actionButton={this.renderButton(error)}
        description={this.getErrorDescription(error)}
        isImportant
        title={this.getErrorTitle(error)}
      />
    )
  }
}

ErrorMessage.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.object.isRequired,
  konnector: PropTypes.object.isRequired,
  onForceConnection: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export default translate()(ErrorMessage)
