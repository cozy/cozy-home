import { deconstructRedirectLink, hasQueryBeenLoaded } from 'cozy-client'
import { isFlagshipApp } from 'cozy-device-helper'

export const VIEW_COUNT_THRESHOLD = 3

export const HOME_DEFAULT_REDIRECTION = 'home/'

export const incrementDefaultRedirectionViewCount = async (
  client,
  homeSettings
) => {
  const { default_redirection_view_count } = homeSettings
  const newHomeSettings = {
    _type: 'io.cozy.home.settings',
    ...homeSettings,
    default_redirection_view_count: default_redirection_view_count
      ? default_redirection_view_count + 1
      : 1
  }

  return await client.save(newHomeSettings)
}

export const disableDefaultRedirectionSnackbar = async (
  client,
  homeSettingsResult
) => {
  const homeSettings =
    (homeSettingsResult.data && homeSettingsResult.data[0]) || {}

  const newHomeSettings = {
    _type: 'io.cozy.home.settings',
    ...homeSettings,
    default_redirection_snackbar_disabled: true
  }

  return await client.save(newHomeSettings)
}

export const setDefaultRedirectionToHome = async (
  client,
  instanceSettingsResult,
  webviewIntent
) => {
  const instanceSettings = {
    _id: instanceSettingsResult.data._id,
    _type: instanceSettingsResult.data._type,
    _rev: instanceSettingsResult.data.meta.rev,
    data: {
      ...instanceSettingsResult.data,
      attributes: {
        ...instanceSettingsResult.data.attributes,
        default_redirection: HOME_DEFAULT_REDIRECTION
      }
    }
  }

  const res = await client.save(instanceSettings)

  if (isFlagshipApp()) {
    webviewIntent.call('setDefaultRedirection', HOME_DEFAULT_REDIRECTION)
  }

  return res
}

export const shouldShowDefaultRedirectionSnackbar = (
  instanceSettingsResult,
  homeSettingsResult,
  isOpen
) => {
  if (
    !hasQueryBeenLoaded(instanceSettingsResult) ||
    !hasQueryBeenLoaded(homeSettingsResult)
  )
    return false

  const {
    data: {
      attributes: { default_redirection }
    }
  } = instanceSettingsResult

  const homeSettings =
    (homeSettingsResult.data && homeSettingsResult.data[0]) || {}

  const {
    default_redirection_snackbar_disabled,
    default_redirection_view_count
  } = homeSettings

  const { slug } = deconstructRedirectLink(default_redirection)

  const isDefaultRedirectionAppHomeApp = slug === 'home'

  const isShowThresholdReached =
    default_redirection_view_count >= VIEW_COUNT_THRESHOLD

  const isDisabled = default_redirection_snackbar_disabled

  return (
    !isDefaultRedirectionAppHomeApp &&
    isShowThresholdReached &&
    !isDisabled &&
    isOpen
  )
}
