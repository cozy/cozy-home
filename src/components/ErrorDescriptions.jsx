import React from 'react'

import DescriptionContent from './DescriptionContent'
import {
  getMostAccurateErrorKey,
  isKonnectorKnownError
} from '../lib/konnectors'

const getErrorTitle = (t, error) =>
  t(getMostAccurateErrorKey(t, error, key => `connection.error.${key}.title`))

const getErrorDescription = (t, konnector, error) =>
  t(
    getMostAccurateErrorKey(
      t,
      error,
      key => `connection.error.${key}.description`
    ),
    {
      name: konnector.name,
      link: konnector.vendor_link
    }
  )

export const KnownErrorDescription = ({
  t,
  connector,
  error,
  message,
  title
}) => (
  <DescriptionContent
    cssClassesObject={{ 'coz-error': true }}
    title={title || getErrorTitle(t, error)}
    hasError
    messages={[message || getErrorDescription(t, connector, error)]}
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

export const ErrorDescription = props => {
  const { error } = props

  if (!isKonnectorKnownError(error)) {
    return <GlobalErrorDescription {...props} />
  }

  // FIXME temporarily, only for EDF
  if (props.connector && props.connector.slug === 'edf') {
    return (
      <KnownErrorDescription
        error={error}
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
  return <KnownErrorDescription error={error} {...props} />
}

export default ErrorDescription
