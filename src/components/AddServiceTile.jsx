/* global cozy */
import React, { Component } from 'react'
import Icon from 'cozy-ui/react/Icon'
import Spinner from 'cozy-ui/react/Spinner'

import addServiceIcon from '../assets/icons/icon-plus-add-service.svg'

export class AddServiceTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirecting: false
    }

    this.toggleRedirect = this.toggleRedirect.bind(this)
  }

  async toggleRedirect() {
    if (this.state.redirecting) return // don't toggle twice
    this.setState(() => ({ redirecting: true }))
    try {
      await cozy.client.intents.redirect('io.cozy.apps', { type: 'konnector' })
    } catch (error) {
      console.error(error)
      this.setState({
        redirecting: false
      })
    }
  }

  render() {
    const { label } = this.props
    const { redirecting } = this.state
    return (
      <div
        aria-busy={redirecting}
        className="item-wrapper --add-service"
        onClick={this.toggleRedirect}
      >
        {redirecting ? (
          <Spinner color="grey" size="xlarge" />
        ) : (
          <div className="item-icon">
            <Icon icon={addServiceIcon} />
          </div>
        )}
        <span className="item-title">{label}</span>
      </div>
    )
  }
}

export default AddServiceTile
