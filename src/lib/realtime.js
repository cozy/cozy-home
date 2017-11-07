/* global WebSocket */

// Custom object wrapping logic to websocket and exposing a subscription
// interface
let cozySocket

// Important, must match the spec,
// see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
const WEBSOCKET_STATE = {
  OPEN: 1
}

const KEEPALIVE = {
  INTERVAL: 30000,
  METHOD_NAME: 'ping'
}

// Send a subscribe message for the given doctype trough the given websocket, but
// only if it is in a ready state. If not, retry a few milliseconds later.
function subscribeWhenReady(doctype, socket) {
  if (socket.readyState === WEBSOCKET_STATE.OPEN) {
    try {
      socket.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          payload: {
            type: doctype
          }
        })
      )
    } catch (error) {
      console.warn &&
        console.warn(`Cannot subscribe to doctype ${doctype}: ${error.message}`)
      throw error
    }
  } else {
    setTimeout(() => {
      subscribeWhenReady(doctype, socket)
    }, 10)
  }
}

function getWebsocketProtocol() {
  return window.location.protocol === 'http:' ? 'ws' : 'wss'
}

function keepAlive(socket, interval, message) {
  const keepAliveInterval = setInterval(() => {
    if (socket.readyState === WEBSOCKET_STATE.OPEN) {
      socket.send(message)
    } else {
      clearInterval(keepAliveInterval)
    }
  }, interval)

  return socket
}

async function connectWebSocket(cozy, onmessage, onclose) {
  return new Promise((resolve, reject) => {
    const protocol = getWebsocketProtocol()
    const socket = new WebSocket(
      `${protocol}:${cozy._url}/realtime/`,
      'io.cozy.websocket'
    )

    socket.onopen = event => {
      try {
        socket.send(
          JSON.stringify({
            method: 'AUTH',
            payload: cozy._token.token
          })
        )
      } catch (error) {
        return reject(error)
      }

      const windowUnloadHandler = () => socket.close()
      window.addEventListener('beforeunload', windowUnloadHandler)

      socket.onmessage = onmessage
      socket.onclose = event => {
        window.removeEventListener('beforeunload', windowUnloadHandler)
        if (typeof onclose === 'function') onclose(event)
      }
      socket.onerror = error =>
        console.error && console.error(`WebSocket error: ${error.message}`)

      resolve(
        keepAlive(
          socket,
          KEEPALIVE.INTERVAL,
          `{"method":"${KEEPALIVE.METHOD_NAME}"}`
        )
      )
    }
  })
}

function getCozySocket(cozy) {
  return new Promise(async (resolve, reject) => {
    if (cozySocket) return resolve(cozySocket)

    const listeners = {}

    let socket

    const onSocketMessage = event => {
      const data = JSON.parse(event.data)
      const eventType = data.event.toLowerCase()
      const payload = data.payload

      if (eventType === 'error') {
        const isPingError =
          data.payload &&
          data.payload.source &&
          data.payload.source.method === KEEPALIVE.METHOD_NAME
        if (isPingError) return

        const realtimeError = new Error(payload.title)
        const errorFields = ['status', 'code', 'source']
        errorFields.forEach(property => {
          realtimeError[property] = payload[property]
        })

        throw realtimeError
      }

      if (listeners[payload.type] && listeners[payload.type][eventType]) {
        listeners[payload.type][eventType].forEach(listener => {
          listener(payload.doc)
        })
      }
    }

    const onSocketClose = async event => {
      if (!event.wasClean) {
        console.warn &&
          console.warn(
            `WebSocket closed unexpectedly with code ${event.code} and ${event.reason
              ? `reason: '${event.reason}'`
              : 'no reason'}. Reconnecting.`
          )
        try {
          socket = await connectWebSocket(cozy, onSocketMessage, onSocketClose)
        } catch (error) {
          console.error &&
            console.error(
              `Unable to reconnect to realtime. Error: ${error.message}`
            )
        }
      }
    }

    try {
      socket = await connectWebSocket(cozy, onSocketMessage, onSocketClose)
    } catch (error) {
      reject(error)
    }

    cozySocket = {
      subscribe: (doctype, event, listener) => {
        if (typeof listener !== 'function')
          throw new Error('Realtime event listener must be a function')

        if (!listeners[doctype]) {
          listeners[doctype] = {}
          subscribeWhenReady(doctype, socket)
        }

        listeners[doctype][event] = (listeners[doctype][event] || []).concat([
          listener
        ])
      },
      unsubscribe: (doctype, event, listener) => {
        if (
          listeners[doctype] &&
          listeners[doctype][event] &&
          listeners[doctype][event].includes(listener)
        ) {
          listeners[doctype][event] = listeners[doctype][event].filter(
            l => l !== listener
          )
        }
      }
    }

    resolve(cozySocket)
  })
}

// Returns the Promise of a subscription to a given doctype and document
export function subscribe(cozy, doctype, doc, parse = doc => doc) {
  return subscribeAll(cozy, doctype, parse).then(subscription => {
    // We will call the listener only for the given document, so let's curry it
    const docListenerCurried = listener => {
      return syncedDoc => {
        if (syncedDoc._id === doc._id) {
          listener(syncedDoc)
        }
      }
    }

    return {
      onCreate: listener => subscription.onCreate(docListenerCurried(listener)),
      onUpdate: listener => subscription.onUpdate(docListenerCurried(listener)),
      onDelete: listener => subscription.onDelete(docListenerCurried(listener)),
      unsubscribe: () => subscription.unsubscribe()
    }
  })
}

// Returns the Promise of a subscription to a given doctype (all documents)
export function subscribeAll(cozy, doctype, parse = doc => doc) {
  return getCozySocket(cozy).then(cozySocket => {
    // Some document need to have specific parsing, for example, decoding
    // base64 encoded properties
    const parseCurried = listener => {
      return doc => {
        listener(parse(doc))
      }
    }

    let createListener, updateListener, deleteListener

    const subscription = {
      onCreate: listener => {
        createListener = parseCurried(listener)
        cozySocket.subscribe(doctype, 'created', createListener)
        return subscription
      },
      onUpdate: listener => {
        updateListener = parseCurried(listener)
        cozySocket.subscribe(doctype, 'updated', updateListener)
        return subscription
      },
      onDelete: listener => {
        deleteListener = parseCurried(listener)
        cozySocket.subscribe(doctype, 'deleted', deleteListener)
        return subscription
      },
      unsubscribe: () => {
        cozySocket.unsubscribe(doctype, 'created', createListener)
        cozySocket.unsubscribe(doctype, 'updated', updateListener)
        cozySocket.unsubscribe(doctype, 'deleted', deleteListener)
      }
    }

    return subscription
  })
}
