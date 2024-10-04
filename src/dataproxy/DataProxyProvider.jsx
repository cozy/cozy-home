import * as Comlink from 'comlink'
import React, { useMemo, useContext, useState, useEffect } from 'react'

import { generateWebLink, useClient } from 'cozy-client'

export const DataProxyContext = React.createContext()

export const useDataProxy = () => {
  const context = useContext(DataProxyContext)

  return context
}

export const DataProxyProvider = React.memo(({ children }) => {
  const client = useClient()
  const [iframeUrl, setIframeUrl] = useState()
  const [dataProxy, setDataProxy] = useState()

  useEffect(() => {
    if (!client) return

    const cozyURL = new URL(client.getStackClient().uri)
    const { subdomain: subDomainType } = client.getInstanceOptions()
    const slug = 'dataproxy'

    const dataProxyUrl = generateWebLink({
      pathname: '/',
      cozyUrl: cozyURL.origin,
      slug,
      hash: null,
      subDomainType
    })

    setIframeUrl(dataProxyUrl)
  }, [client])

  const onIframeLoaded = () => {
    console.log('onIframeLoaded')
    const ifr = document.getElementById('DataProxy')
    const remote = Comlink.wrap(Comlink.windowEndpoint(ifr.contentWindow))
    setDataProxy(() => remote)
  }

  const search = async (search) => {
    console.log('Send hello')
    // document.getElementById('DataProxy').contentWindow.postMessage(message, iframeUrl)
    const result = await dataProxy.search(search)

    console.log('FINAL RESULT', result)

    return result
  }

  const value = {
    search
  }

  return (
    <DataProxyContext.Provider value={value}>
      {children}
      {iframeUrl ? (
        <iframe
          id="DataProxy"
          src={iframeUrl}
          width={0}
          height={0}
          sandbox="allow-same-origin allow-scripts"
          onLoad={onIframeLoaded}
        ></iframe>
      ) : undefined}
    </DataProxyContext.Provider>
  )
})

DataProxyProvider.displayName = 'DataProxyProvider'
