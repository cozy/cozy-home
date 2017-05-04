/** @jsx h */
import { h } from 'preact'

import Field, { DropdownField } from './Field'
import AccountLoginForm from './AccountLoginForm'

// Ensure that path has a / as first character
const sanitizePath = path => path.charAt(0) === '/' ? path : `/${path}`

const folderLink = (path, folders) => {
  path = sanitizePath(path)
  let folder = folders.find(f => f.path + '/' + f.name === path)
  if (!folder) return
  return `/apps/files/#folders/${folder.id}`
}

const AccountConfigForm = ({ t, customView, fields, dirty, error, submit, submitting }) => (
  <div class={'account-form' + (error ? ' error' : '')}>
    {fields.folderPath &&
      <div>
        <h3>{t('location')}</h3>
        <p>{t('location desc')}</p>
        <DropdownField label={false} {...fields.folderPath} />
        <a href={folderLink(fields.folderPath.value, fields.folderPath.folders)} target='_blank'>
          {t('location button')}
        </a>
      </div>
    }
    {fields.calendar &&
      <div>
        <h3>{t('calendar')}</h3>
        <p>{t('calendar desc')}</p>
        <Field label={false} {...fields.calendar} />
      </div>
    }
    <h3>{t('frequency')}</h3>
    <p>{t('frequency desc')}</p>
    <Field label={false} {...fields.frequency}>
      <select className='account-field-dropdown'>
        <option value='none'>{t('none')}</option>
        <option value='hour'>{t('every hour')}</option>
        <option value='day'>{t('every day')}</option>
        <option value='week'>{t('every week')}</option>
        <option value='month'>{t('each month')}</option>
      </select>
    </Field>
    <h3>{t('account')}</h3>
    <AccountLoginForm
      t={t}
      customView={customView}
      fields={fields}
    />
    {error === 'bad credentials' &&
      <p class='errors'>{t('account config bad credentials')}</p>
    }
  </div>
)

export default AccountConfigForm
