/* global cozy */

import React, { Component } from 'react'
import Spinner from 'cozy-ui/react/Spinner'

export class StoreRedirection extends Component {
  constructor(props) {
    super(props)
    const category = props.match && props.match.params.category
    const options = { type: 'konnector' }
    if (category && category !== 'all') {
      options.category = props.match.params.category
    }
    cozy.client.intents.redirect('io.cozy.apps', options)
  }

  render() {
    return <Spinner size="xxlarge" middle />
  }
}

export default StoreRedirection
