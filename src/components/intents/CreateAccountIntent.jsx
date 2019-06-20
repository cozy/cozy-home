import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CreateAccountService from 'components/services/CreateAccountService'
import KonnectorHeaderIcon from 'components/KonnectorHeaderIcon'

class CreateAccountIntent extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = context.store
    this.state = { isSuccess: false }
    this.store.fetchUrls()
  }

  handleConnectionSuccess = () => {
    this.setState({ isSuccess: true })
  }

  render() {
    const { konnector, onCancel, onTerminate } = this.props
    const { isSuccess } = this.state
    return (
      <div className="col-create-account-intent">
        {!isSuccess && <KonnectorHeaderIcon konnector={konnector} center />}
        {konnector && (
          <CreateAccountService
            konnector={konnector}
            onCancel={() => onCancel()}
            onSuccess={onTerminate}
            handleConnectionSuccess={this.handleConnectionSuccess}
          />
        )}
      </div>
    )
  }
}

CreateAccountIntent.contextTypes = {
  store: PropTypes.object
}

export default CreateAccountIntent
