/* global cozy */
import React, { Component } from 'react'
import { Button } from 'cozy-ui/react/Button'

export class StoreTile extends Component {
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
      <div className="item-wrapper --add-service" onClick={this.toggleRedirect}>
        <header className="item-header">
          <img
            className="item-icon"
            src={require('../assets/images/icon-add-from-store.svg')}
          />
        </header>
        <Button
          busy={redirecting}
          disabled={redirecting}
          className="item-add-service-button"
          subtle
        >
          {label}
        </Button>
      </div>
    )
  }
}

export default StoreTile
