import { useState, useEffect } from 'react'

import CozyClient, { Q } from 'cozy-client'
import { QueryState } from 'cozy-client/types/types'

/**
 * @TODO
 * Implement this Interface in cozy-client, cozy-home is not the place.
 * Try to find every possible setting, its type and its availability.
 */
interface InstanceAttributes {
  auth_mode?: string
  auto_update?: boolean
  context?: string
  email?: string
  locale?: string
  moved_from?: string
  oidc_id?: unknown
  onboarding_finished?: boolean
  public_name?: string
  tos?: unknown
  tos_latest?: unknown
  uuid?: unknown
}

enum FetchStatus {
  Failed = 'failed',
  Idle = 'idle',
  Loaded = 'loaded',
  Loading = 'loading'
}

interface InstanceSettings {
  fetchStatus: FetchStatus
  instanceSettings: InstanceAttributes
}

const shouldSetLocal = (instanceSettings: QueryState): boolean =>
  Boolean(
    instanceSettings &&
      (instanceSettings.fetchStatus === FetchStatus.Loaded ||
        instanceSettings.lastFetch)
  )

const getLocalAttributes = (
  instanceSettings: QueryState
): InstanceAttributes | undefined =>
  (Array.isArray(instanceSettings.data) &&
    instanceSettings.data.length > 0 &&
    (instanceSettings.data[0] as { attributes?: InstanceAttributes })
      .attributes) ||
  undefined

type FetchAttributesResponse = {
  data?: { attributes?: InstanceAttributes }
} | void

const fetchAttributes = async (
  client: CozyClient
): Promise<InstanceAttributes | void> => {
  const res = (await client.query(
    Q('io.cozy.settings').getById('io.cozy.settings.instance')
  )) as FetchAttributesResponse

  return res?.data?.attributes
}

export const useInstanceSettings = (client: CozyClient): InstanceSettings => {
  const [settings, setSettings] = useState<
    InstanceAttributes | Record<string, never>
  >({})
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setFetchStatus(FetchStatus.Loading)

        const instanceSettings = client.getQueryFromState(
          'io.cozy.settings/io.cozy.settings.instance'
        )

        if (shouldSetLocal(instanceSettings)) {
          const localAttributes = getLocalAttributes(instanceSettings)

          if (localAttributes) {
            setSettings(localAttributes)
            return setFetchStatus(FetchStatus.Loaded)
          }
        }

        const fetchedAttributes = await fetchAttributes(client)
        fetchedAttributes && setSettings(fetchedAttributes)

        setFetchStatus(FetchStatus.Loaded)
      } catch (error) {
        setFetchStatus(FetchStatus.Failed)
      }
    }

    void fetchData()
  }, [client])

  return { instanceSettings: settings, fetchStatus }
}

export default useInstanceSettings
