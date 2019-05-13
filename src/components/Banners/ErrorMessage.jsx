import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { isKonnectorTwoFAError } from 'lib/konnectors'
import Button from 'cozy-ui/react/Button'
import Icon from 'cozy-ui/react/Icon'
import Infos from 'cozy-ui/react/Infos'
import PropTypes from 'prop-types'
import { TriggerLauncher } from 'cozy-harvest-lib'

import { getMostAccurateErrorKey, isKonnectorKnownError } from 'lib/konnectors'

export class ErrorMessage extends Component {
  constructor(props) {
    super(props)
    this.renderButton = this.renderButton.bind(this)
    this.getErrorTitle = this.getErrorTitle.bind(this)
    this.getErrorDescription = this.getErrorDescription.bind(this)
  }

  renderButton(error) {
    const { t, isKonnectorRunning, trigger } = this.props
    if (isKonnectorTwoFAError(error)) {
      return (
        <TriggerLauncher trigger={trigger} submitting={isKonnectorRunning}>
          {({ launch, running }) => (
            <Button
              label={t('connection.CTA.twofa_failed')}
              icon={<Icon focusable="false" icon="sync" spin={running} />}
              theme="secondary"
              className="u-m-0"
              disabled={running}
              onClick={launch}
            />
          )}
        </TriggerLauncher>
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
        <Infos
          className="u-maw-none"
          text={t('connection.error.default.description', {
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
        <Infos
          className="u-maw-none"
          text={t('status.edf.maintenance', {
            supportLink: t('status.edf.support_link')
          })}
          title={t('status.interrupted')}
          isImportant
        />
      )
    }

    return (
      <Infos
        actionButton={this.renderButton(error)}
        className="u-maw-none"
        text={this.getErrorDescription(error)}
        isImportant
        title={this.getErrorTitle(error)}
      />
    )
  }
}

ErrorMessage.propTypes = {
  isKonnectorRunning: PropTypes.bool,
  error: PropTypes.object.isRequired,
  konnector: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  /**
   * The trigger to launch
   */
  trigger: PropTypes.object.isRequired
}

export default translate()(ErrorMessage)
