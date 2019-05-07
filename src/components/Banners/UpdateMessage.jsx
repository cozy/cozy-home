/* global cozy */

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Button from 'cozy-ui/react/Button'
import Infos from 'cozy-ui/react/Infos'
import PropTypes from 'prop-types'

export class UpdateMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRedirecting: false
    }
    this.redirectToStore = this.redirectToStore.bind(this)
  }

  async redirectToStore() {
    this.setState({ isRedirecting: true })
    const { konnector } = this.props
    try {
      await cozy.client.intents.redirect('io.cozy.apps', {
        slug: konnector.slug,
        step: 'update'
      })
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.error(error)
      this.setState({ isRedirecting: false })
    }
  }

  render() {
    const { t, isBlocking } = this.props
    const { isRedirecting } = this.state

    return (
      <Infos
        actionButton={
          <Button
            label={t('update.CTA')}
            theme="danger"
            className="u-m-0"
            onClick={this.redirectToStore}
            disabled={isRedirecting}
          />
        }
        className="u-maw-none"
        text={isBlocking ? t('update.blocking') : t('update.regular')}
        isImportant={isBlocking}
        title={t('update.title')}
      />
    )
  }
}

UpdateMessage.propTypes = {
  konnector: PropTypes.object.isRequired,
  isBlocking: PropTypes.bool,
  t: PropTypes.func.isRequired
}

export default translate()(UpdateMessage)
