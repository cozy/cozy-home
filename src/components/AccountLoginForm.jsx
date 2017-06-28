import styles from '../styles/accountLoginForm'

import React from 'react'
import classNames from 'classnames'
import statefulForm from '../lib/statefulForm'
import { translate } from 'cozy-ui/react/I18n'
import Field, { PasswordField, DropdownField, CheckboxField } from './Field'
import ReactMarkdownWrapper from './ReactMarkdownWrapper'
import FixedProgress from './FixedProgress'

import AccountForceConnection from './AccountForceConnection'

const AccountLoginForm = ({ t, isOAuth, oAuthTerminated, fields, error, dirty, submitting, forceEnabled, deleting, values, submit, onDelete, onCancel, connectorSlug, isSuccess, onAccountConfig, disableSuccessTimeout, isUnloading, onForceConnection, hasGlobalError }) => {
  const isUpdate = !!values && Object.keys(values).length > 0
  const submitEnabled = dirty || isOAuth || forceEnabled
  return (
    <div className={styles['account-form-login']}>
      {error &&
        <p className='errors'>
          {t('account.message.error.bad_credentials')}
        </p>
      }
      {!!fields && Object.keys(fields)
        .filter(name => !fields[name].advanced)
        .map(name => {
          const inputName = `${name}_${connectorSlug}`
          const description = fields[name].hasDescription
            ? <ReactMarkdownWrapper source={t(`connector.${connectorSlug}.description.field.${name}`)} />
            : ''
          switch (fields[name].type) {
            case 'password':
              return <div>
                {description}
                <PasswordField
                  label={t(`account.form.label.${name}`)}
                  name={inputName}
                  placeholder={t('account.form.placeholder.password')}
                  invalid={!!error}
                  noAutoFill
                  {...Object.assign({}, fields[name], {
                    value: isUnloading ? '' : fields[name].value
                  })}
                />
              </div>
            case 'dropdown':
              return <div>
                {description}
                <DropdownField label={t(`account.form.label.${name}`)} {...fields[name]} />
              </div>
            case 'checkbox':
              return <div>
                {description}
                <CheckboxField label={t(`account.form.label.${name}`)} {...fields[name]} />
              </div>
            default:
              const readOnly = name === 'login' && isUpdate
              return <div>
                {description}
                <Field
                  label={t(`account.form.label.${name}`)}
                  name={inputName}
                  readOnly={readOnly}
                  invalid={!!error}
                  noAutoFill
                  {...Object.assign({}, fields[name], {
                    value: isUnloading ? '' : fields[name].value
                  })}
                />
              </div>
          }
        }
      )}
      { values.password && !hasGlobalError &&
        <AccountForceConnection
          submitting={submitting}
          onForceConnection={onForceConnection}
          />
      }
      { isUpdate &&
        <div className={styles['col-account-form-delete']}>
          <h4>{t('account.disconnect.title')}</h4>
          <p>
            {t('account.disconnect.description')}
          </p>
          <button
            className={classNames('coz-btn', 'coz-btn--danger-outline', styles['coz-btn'])}
            disabled={deleting}
            aria-busy={deleting}
            onClick={onDelete}>
            {t('account.form.button.disconnect')}
          </button>
        </div>
      }
      <div className={styles['coz-form-controls']}>
        { isUpdate && !isOAuth &&
          <button
            className={classNames('coz-btn', 'coz-btn--secondary', styles['coz-btn'])}
            onClick={onCancel}
          >
            {t('account.form.button.cancel')}
          </button>
        }
        { (!(isUpdate && isOAuth) && !isSuccess) &&
          <button
            className={classNames('coz-btn', 'coz-btn--regular', styles['coz-btn'])}
            disabled={submitting || !submitEnabled}
            aria-busy={submitting && disableSuccessTimeout ? 'true' : 'false'}
            onClick={submit}
          >
            {t(isUpdate ? 'account.form.button.save' : 'account.form.button.connect')}
          </button>
        }
        { submitting && !disableSuccessTimeout && (!isOAuth || oAuthTerminated) &&
          <FixedProgress duration='32000' />
        }
      </div>
    </div>
  )
}

export default statefulForm()(translate()(AccountLoginForm))
