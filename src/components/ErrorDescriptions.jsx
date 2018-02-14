import React from 'react'

import DescriptionContent from './DescriptionContent'
import { ACCOUNT_ERRORS } from '../lib/accounts'

export const KnownErrorDescription = ({
  t,
  connector,
  errorMessage,
  message,
  title
}) => (
  <DescriptionContent
    cssClassesObject={{ 'coz-error': true }}
    title={title || t(`connection.error.${errorMessage}.title`)}
    hasError
    messages={[
      message ||
        t(`connection.error.${errorMessage}.description`, {
          name: connector.name,
          link: connector.vendorLink
        })
    ]}
  />
)

export const GlobalErrorDescription = ({ t, connector }) => (
  <DescriptionContent
    cssClassesObject={{ 'coz-error': true }}
    title={t('connection.error.default.title')}
    hasError
    messages={[
      t('connection.error.default.description', { name: connector.name })
    ]}
  />
)

export const getErrorDescription = props => {
  const { error } = props
  switch (error.message) {
    case ACCOUNT_ERRORS.NOT_EXISTING_DIRECTORY:
    case ACCOUNT_ERRORS.USER_ACTION_NEEDED:
    case ACCOUNT_ERRORS.MAINTENANCE:
      // FIXME temporarily, only for EDF
      if (props.connector && props.connector.slug === 'edf') {
        return (
          <KnownErrorDescription
            errorMessage={error.message}
            message={
              props.t &&
              props.t('status.edf.maintenance', {
                supportLink: props.t('status.edf.support_link')
              })
            }
            title={props.t && props.t('status.interrupted')}
            {...props}
          />
        )
      }
      return <KnownErrorDescription errorMessage={error.message} {...props} />
    default:
      return <GlobalErrorDescription {...props} />
  }
}

export default getErrorDescription
