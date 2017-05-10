import React from 'react'

import Field, { PasswordField, DropdownField, CheckboxField } from './Field'

const AccountLoginForm = ({ t, fields }) => (
  <div className='account-form-login'>
    {Object.keys(fields)
      .filter(name => !fields[name].advanced)
      .map(name => {
        if (fields[name].type === 'password') {
          return <PasswordField label={t(name)} {...fields[name]} />
        }
        if (fields[name].type === 'dropdown') {
          return <DropdownField label={t(name)} {...fields[name]} />
        }

        if (fields[name].type === 'checkbox') {
          return <CheckboxField label={t(name)} {...fields[name]} />
        }

        return <Field label={t(name)} {...fields[name]} />
      }
    )}
  </div>
)

export default AccountLoginForm
