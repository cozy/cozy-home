/* global cozy */

import React, { Component } from 'react'
import Spinner from 'cozy-ui/react/Spinner'

export class StoreRedirection extends Component {
  constructor(props) {
    super(props)
    cozy.client.intents.redirect('io.cozy.apps', {
      type: 'konnector'
    })
  }

  render() {
    return <Spinner size="xxlarge" middle />
  }
}

export default StoreRedirection
