import { useState, useEffect } from 'react'

import {
  useClient,
  useSettings,
  deconstructRedirectLink,
  hasQueryBeenLoaded
} from 'cozy-client'

import { VIEW_COUNT_THRESHOLD } from './useShouldShowDefaultRedirectionSnackbar'
import useHomeAppOpened from './useHomeAppOpened'

const useIncrementDefaultRedirectionViewCount = () => {
  const client = useClient()
  const [hasIncremented, setHasIncremented] = useState(false)
  const { homeJustOpenedOnFlagshipApp, homeJustQuitOnFlagshipApp } =
    useHomeAppOpened()

  const {
    values: valueHome,
    save: saveHome,
    query: queryHome
  } = useSettings('home', [
    'default_redirection_view_count',
    'default_redirection_snackbar_disabled'
  ])

  const { values: valueInstance, query: queryInstance } = useSettings(
    'instance',
    ['default_redirection']
  )

  useEffect(() => {
    if (hasIncremented && homeJustQuitOnFlagshipApp) {
      setHasIncremented(false)
    }
  }, [hasIncremented, homeJustQuitOnFlagshipApp])

  useEffect(() => {
    if (!hasQueryBeenLoaded(queryHome) || !hasQueryBeenLoaded(queryInstance)) {
      return
    }

    const { slug } = deconstructRedirectLink(valueInstance.default_redirection)

    const isDefaultRedirectionAppHomeApp = slug === 'home'

    const isShowThresholdReached =
      valueHome.default_redirection_view_count >= VIEW_COUNT_THRESHOLD

    const isDisabled = valueHome.default_redirection_snackbar_disabled

    if (
      !hasIncremented &&
      homeJustOpenedOnFlagshipApp &&
      !isDefaultRedirectionAppHomeApp &&
      !isShowThresholdReached &&
      !isDisabled
    ) {
      saveHome({
        default_redirection_view_count:
          (valueHome.default_redirection_view_count ?? 0) + 1
      })
      setHasIncremented(true)
    }
  }, [
    client,
    hasIncremented,
    homeJustOpenedOnFlagshipApp,
    valueInstance,
    valueHome,
    queryHome,
    queryInstance,
    saveHome
  ])
}

export default useIncrementDefaultRedirectionViewCount
