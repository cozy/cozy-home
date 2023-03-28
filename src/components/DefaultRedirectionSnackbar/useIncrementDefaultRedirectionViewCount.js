import { useState, useEffect } from 'react'

import {
  useClient,
  deconstructRedirectLink,
  hasQueryBeenLoaded
} from 'cozy-client'

import {
  VIEW_COUNT_THRESHOLD,
  incrementDefaultRedirectionViewCount
} from './helpers'
import useHomeAppOpened from './useHomeAppOpened'

const useIncrementDefaultRedirectionViewCount = (
  instanceSettingsResult,
  homeSettingsResult
) => {
  const client = useClient()
  const [hasIncremented, setHasIncremented] = useState(false)
  const { homeJustOpenedOnFlagshipApp, homeJustQuitOnFlagshipApp } =
    useHomeAppOpened()

  useEffect(() => {
    if (hasIncremented && homeJustQuitOnFlagshipApp) {
      setHasIncremented(false)
    }
  }, [hasIncremented, homeJustQuitOnFlagshipApp])

  useEffect(() => {
    if (
      !hasQueryBeenLoaded(instanceSettingsResult) ||
      !hasQueryBeenLoaded(homeSettingsResult)
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

    const {
      default_redirection_snackbar_disabled,
      default_redirection_view_count
    } = homeSettings

    const { slug } = deconstructRedirectLink(default_redirection)

    const isDefaultRedirectionAppHomeApp = slug === 'home'

    const isShowThresholdReached =
      default_redirection_view_count >= VIEW_COUNT_THRESHOLD

    const isDisabled = default_redirection_snackbar_disabled

    if (
      !hasIncremented &&
      homeJustOpenedOnFlagshipApp &&
      !isDefaultRedirectionAppHomeApp &&
      !isShowThresholdReached &&
      !isDisabled
    ) {
      incrementDefaultRedirectionViewCount(client, homeSettings)
      setHasIncremented(true)
    }
  }, [
    client,
    hasIncremented,
    homeJustOpenedOnFlagshipApp,
    instanceSettingsResult,
    homeSettingsResult
  ])
}

export default useIncrementDefaultRedirectionViewCount
