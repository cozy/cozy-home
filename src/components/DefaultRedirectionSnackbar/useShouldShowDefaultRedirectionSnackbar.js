import {
  deconstructRedirectLink,
  hasQueryBeenLoaded,
  useSettings
} from 'cozy-client'

export const VIEW_COUNT_THRESHOLD = 3

export const HOME_DEFAULT_REDIRECTION = 'home/'

export const useShouldShowDefaultRedirectionSnackbar = isOpen => {
  const { values: valueHome, query: queryHome } = useSettings('home', [
    'default_redirection_view_count',
    'default_redirection_snackbar_disabled'
  ])

  const { values: valueInstance, query: queryInstance } = useSettings(
    'instance',
    ['default_redirection']
  )

  if (!hasQueryBeenLoaded(queryHome) || !hasQueryBeenLoaded(queryInstance)) {
    return false
  }

  const { slug } = deconstructRedirectLink(valueInstance.default_redirection)

  const isDefaultRedirectionAppHomeApp = slug === 'home'

  const isShowThresholdReached =
    valueHome.default_redirection_view_count >= VIEW_COUNT_THRESHOLD

  const isDisabled = valueHome.default_redirection_snackbar_disabled

  return (
    !isDefaultRedirectionAppHomeApp &&
    isShowThresholdReached &&
    !isDisabled &&
    isOpen
  )
}
