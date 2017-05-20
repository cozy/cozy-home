import React, { Component } from 'react'
import statefulForm from '../lib/statefulForm'

import DataItem from './DataItem'
import ReactMarkdown from 'react-markdown'

class AccountConnection extends Component {
  render () {
    const { t, connector } = this.props
    const { description } = connector

    return (
      <div className='account-connection'>
        <div className='account-description'>
          <h3>{t('title description')}</h3>
          <p>
            <ReactMarkdown
              source={
                t(description)
              }
              renderers={{Link: props => <a href={props.href} target='_blank'>{props.children}</a>}}
            />
          </p>
          <h3>{t('dataType title')}</h3>
          <ul className='account-datas'>
            {connector.dataType && connector.dataType.map(data =>
              <DataItem
                dataType={data}
                hex={connector.color.hex}
              />
            )}
          </ul>
          <p>{` ${connector.name} ${t('dataType disclaimer')} `}</p>
        </div>
      </div>
    )
  }
}

export default statefulForm()(AccountConnection)
