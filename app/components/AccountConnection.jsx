/** @jsx h */
import { h, Component } from 'preact'
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
    }
  }

  render () {
    const { t, connector, fields, error } = this.props
    let { dirty } = this.props
    const { name, customView, description } = connector
    const { submitting } = this.state
    // If there is no field displayed, the form is dirty by default.
    dirty = dirty || Object.values(fields).every(field => field.type === 'hidden' || field.advanced)
    return (
      <div class='account-connection'>
        <div class='account-description'>
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
          <ul class='account-datas'>
            {connector.dataType && connector.dataType.map(data =>
              <DataItem
                dataType={data}
                hex={connector.color.hex}
              />
            )}
          </ul>
          <p>{` ${connector.name} ${t('dataType disclaimer')} `}</p>
        </div>
        <div class='account-login'>
          <h3>{t('account config title', {name: name})}</h3>
          <div class={'account-form' + (error ? ' error' : '')}>
            <AccountLoginForm
              t={t}
              customView={customView}
              fields={fields}
            />
            <div class='account-form-controls'>
              <button
                disabled={!dirty}
                aria-busy={submitting ? 'true' : 'false'}
                onClick={() => this.submit()}
              >
                {t('account config button')}
              </button>
              {error === 'bad credentials' &&
                <p class='errors'>{t('account config bad credentials')}</p>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default statefulForm()(AccountConnection)
