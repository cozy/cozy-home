/* global cozy */
import React, { Component } from 'react'
import { Button } from 'cozy-ui/react/Button'
import Icon from 'cozy-ui/react/Icon'

import addAccountIcon from '../assets/icons/icon-plus.svg'

export class StoreButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirecting: false
    }

    this.toggleRedirect = this.toggleRedirect.bind(this)
  }

  async toggleRedirect() {
    this.setState(() => ({ redirecting: true }))
    try {
      await cozy.client.intents.redirect('io.cozy.konn', { type: 'konnector' })
    } catch (error) {
      console.error(error)
      this.setState({
        redirecting: false
      })
    }
  }

  render() {
    const { icon, label } = this.props
    const { redirecting } = this.state
    return (
      <Button
        busy={redirecting}
        disabled={redirecting}
        onClick={this.toggleRedirect}
      >
        {icon && <Icon icon={addAccountIcon} className="col-icon--add" />}
        <span>{label}</span>
      </Button>
    )
  }
}

export default StoreButton
