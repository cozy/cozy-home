import React, { Component } from 'react'
import statefulForm from '../lib/statefulForm'

import AccountLoginForm from './AccountLoginForm'
import DataItem from './DataItem'
import ReactMarkdown from 'react-markdown'

class AccountConnection extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      submitting: false
    }

    this.submit = () => {
      this.setState({
        submitting: true
      })

      this.props.submit()
        .catch(error => this.setState({submitting: false, error: error.message}))
    }
  }

  render () {
    const { t, connector, fields, error } = this.props
    let { dirty } = this.props
    const { name, description } = connector
    const { submitting } = this.state

    let button = <button disabled={!dirty} aria-busy={submitting ? 'true' : 'false'}
      onClick={() => this.submit()}>
      {t('account config button')}
    </button>

    if (connector.oauth) {
      // TODO find properly the root cozy url (without data-account)
      button = <a target='_blank' href='http://cozy.tools:8080/accounts/orange/start'>Submit</a>
    }

    // If there is no field displayed, the form is dirty by default.
    dirty = dirty || Object.values(fields).every(field => field.type === 'hidden' || field.advanced)
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
        <div className='account-login'>
          <h3>{t('account config title', {name: name})}</h3>
          <div className={'account-form' + (error ? ' error' : '')}>
            <AccountLoginForm
              t={t}
              fields={fields}
            />
            <div className='account-form-controls'>
              {button}
              {error === 'bad credentials' &&
                <p className='errors'>{t('account config bad credentials')}</p>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default statefulForm()(AccountConnection)
