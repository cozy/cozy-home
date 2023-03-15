import { useState, useEffect } from 'react'

import {
  useClient,
  deconstructRedirectLink,
  hasQueryBeenLoaded
} from 'cozy-client'

import { NAV_APP_SHOW_THRESHOLD, incrementNavAppShowCount } from './helpers'

export const useIncrementNavAppShowCount = instanceSettingsResult => {
  const client = useClient()
  const [hasIncremented, setHasIncremented] = useState(false)

  useEffect(() => {
    if (!hasQueryBeenLoaded(instanceSettingsResult)) return

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

    if (
      !hasIncremented &&
      !isDefaultRedirectionAppHomeApp &&
      !isShowThresholdReached &&
      !isDisabled
    ) {
      incrementNavAppShowCount(client, instanceSettingsResult)
      setHasIncremented(true)
    }
  }, [client, hasIncremented, instanceSettingsResult])
}
