import React, { Component } from 'react'
import { cozyConnect } from 'redux-cozy-client'

import Sidebar from '../components/Sidebar'
import Notifier from '../components/Notifier'

import Loading from '../components/Loading'
import Failure from '../components/Failure'
import ConnectionsQueue from '../ducks/connections/components/queue/index'

import { initializeRegistry } from '../ducks/registry'
import { fetchKonnectors } from '../ducks/konnectors'

class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store

    this.state = {
      categories: [],
      isFetching: true,
      showQueue: false
    }

    props.initializeRegistry(props.initKonnectors)

    this.store.fetchInitialData(props.domain)
      .then(() => {
        this.setState({
          categories: this.store.categories,
          isFetching: false
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({
          isFetching: false,
          error
        })
      })
  }

  toggleQueue (showQueue) {
    this.setState({
      showQueue: showQueue
    })
  }

  hideQueue () { this.toggleQueue(false) }
  showQueue () { this.toggleQueue(true) }

  render () {
    const { children } = this.props
    const { categories, isFetching, error, showQueue } = this.state
    if (error) {
      return (
        <div className='con-initial-error'>
          <Failure errorType='initial' />
        </div>
      )
    }
    return (
      isFetching
        ? <div className='con-initial-loading'>
          <Loading loadingType='initial' />
        </div>
        : <div className='con-wrapper coz-sticky'>
          <Sidebar categories={categories} />
          <main className='con-content'>
            <div role='contentinfo'>
              {children}
            </div>
          </main>
          <Notifier />
          <ConnectionsQueue
            visible={showQueue}
            purgeQueue={() => this.hideQueue()} />
        </div>
    )
  }
}

const mapActionsToProps = (dispatch) => ({
  initializeRegistry: (konnectors) => dispatch(initializeRegistry(konnectors))
})

const mapDocumentsToProps = (ownProps) => ({
  konnectors: fetchKonnectors()
})

export default cozyConnect(mapDocumentsToProps, mapActionsToProps)(App)
