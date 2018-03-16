import React from 'react'

import DescriptionContent from './DescriptionContent'
import { isKonnectorKnownError } from '../lib/konnectors'

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

  if (!isKonnectorKnownError(error)) {
    return <GlobalErrorDescription {...props} />
  }

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
}

export default getErrorDescription
