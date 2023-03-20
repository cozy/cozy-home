import { useState, useEffect } from 'react'

import {
  useClient,
  deconstructRedirectLink,
  hasQueryBeenLoaded
} from 'cozy-client'

import { NAV_APP_SHOW_THRESHOLD, incrementNavAppShowCount } from './helpers'

export const useIncrementNavAppShowCount = (
  instanceSettingsResult,
  homeSettingsResult
) => {
  const client = useClient()
  const [hasIncremented, setHasIncremented] = useState(false)

  useEffect(() => {
    if (
      !hasQueryBeenLoaded(instanceSettingsResult) ||
      !hasQueryBeenLoaded(homeSettingsResult) ||
      !instanceSettingsResult.data
    ) {
      return
    }

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

    if (
      !hasIncremented &&
      !isDefaultRedirectionAppHomeApp &&
      !isShowThresholdReached &&
      !isDisabled
    ) {
      incrementNavAppShowCount(client, homeSettings)
      setHasIncremented(true)
    }
  }, [client, hasIncremented, instanceSettingsResult, homeSettingsResult])
}
