/** @jsx h */
import { h } from 'preact'

import Field, { PasswordField, DropdownField, CheckboxField } from './Field'

const AccountLoginForm = ({ t, customView, fields }) => (
  <div class='account-form-login'>
    {customView &&
      <div class='coz-custom-view'
        dangerouslySetInnerHTML={{
          __html: customView.replace(/<%t (.*) %>/gi, (match, $1) => t($1))
        }} />
    }
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
