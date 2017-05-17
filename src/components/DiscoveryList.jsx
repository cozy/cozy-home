import React, { Component } from 'react'
import { translate } from '../plugins/i18n'
import UseCaseList from './UseCaseList'
import { isTutorial, display as displayTutorial } from '../lib/tutorial'

class DiscoveryList extends Component {
  componentDidMount () {
    if (isTutorial()) {
      setTimeout(() => {
        displayTutorial(this.props.t)
      }, 1000)
    }
  }

  render () {
    const { t, useCases, context, children } = this.props
    return (
      <div className='content'>
        <h1>{t('discovery title')}</h1>
        <UseCaseList useCases={useCases} context={context} />
        {children}
      </div>
    )
  }
}

export default translate()(DiscoveryList)
