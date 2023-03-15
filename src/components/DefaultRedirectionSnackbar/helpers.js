import { deconstructRedirectLink, hasQueryBeenLoaded } from 'cozy-client'

export const NAV_APP_SHOW_THRESHOLD = 3

export const HOME_DEFAULT_REDIRECTION = 'home/'

export const incrementNavAppShowCount = async (
  client,
  instanceSettingsResult
) => {
  const { nav_app_show_count } = instanceSettingsResult.data.attributes

  const instanceSettings = {
    data: {
      ...instanceSettingsResult.data,
      attributes: {
        ...instanceSettingsResult.data.attributes,
        nav_app_show_count: nav_app_show_count ? nav_app_show_count + 1 : 1
      }
    }
  }

  return await client.save(instanceSettings)
}

export const disableDefaultRedirectionSnackbar = async (
  client,
  instanceSettingsResult
) => {
  const instanceSettings = {
    data: {
      ...instanceSettingsResult.data,
      attributes: {
        ...instanceSettingsResult.data.attributes,
        default_redirection_snackbar_disabled: true
      }
    }
  }

  return await client.save(instanceSettings)
}

export const setDefaultRedirectionToHome = async (
  client,
  instanceSettingsResult
) => {
  const instanceSettings = {
    data: {
      ...instanceSettingsResult.data,
      attributes: {
        ...instanceSettingsResult.data.attributes,
        default_redirection: HOME_DEFAULT_REDIRECTION
      }
    }
  }

  return await client.save(instanceSettings)
}

export const shouldShowDefaultRedirectionSnackbar = (
  instanceSettingsResult,
  isOpen
) => {
  if (!hasQueryBeenLoaded(instanceSettingsResult)) return false

  const {
    data: {
      attributes: {
        default_redirection,
        default_redirection_snackbar_disabled,
        nav_app_show_count
      }
    }
  } = instanceSettingsResult

  const { slug } = deconstructRedirectLink(default_redirection)

  const isDefaultRedirectionAppHomeApp = slug === 'home'

  const isShowThresholdReached = nav_app_show_count >= NAV_APP_SHOW_THRESHOLD

  const isDisabled = default_redirection_snackbar_disabled

  return (
    !isDefaultRedirectionAppHomeApp &&
    isShowThresholdReached &&
    !isDisabled &&
    isOpen
  )
}
