/* eslint-disable no-console */
import { deconstructRedirectLink, hasQueryBeenLoaded } from 'cozy-client'

export const NAV_APP_SHOW_THRESHOLD = 3

export const HOME_DEFAULT_REDIRECTION = 'home/'

export const incrementNavAppShowCount = async (client, homeSettings) => {
  const { nav_app_show_count } = homeSettings
  const newHomeSettings = {
    _type: 'io.cozy.home.settings',
    ...homeSettings,
    nav_app_show_count: nav_app_show_count ? nav_app_show_count + 1 : 1
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
  instanceSettingsResult
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

  console.log('res')
  console.log(res)

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

  console.log('######')
  console.log(instanceSettingsResult)

  const {
    data: {
      attributes: { default_redirection }
    }
  } = instanceSettingsResult

  const homeSettings =
    (homeSettingsResult.data && homeSettingsResult.data[0]) || {}

  const { default_redirection_snackbar_disabled, nav_app_show_count } =
    homeSettings

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
