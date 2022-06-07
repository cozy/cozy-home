import { useEffect, useState } from 'react'

/** Internals */

enum AppAction {
  CloseApp = 'closeApp',
  OpenApp = 'openApp'
}

const openAppEvent = new Event(AppAction.OpenApp)

const closeAppEvent = new Event(AppAction.CloseApp)

/** API */

export enum AppState {
  Closed = '',
  Opened = ' App--opened '
}

export const openApp = (): boolean => window.dispatchEvent(openAppEvent)

export const closeApp = (): boolean => window.dispatchEvent(closeAppEvent)

export const useOpenApp = (): { getAppState: AppState } => {
  const [state, setState] = useState(AppState.Closed)

  useEffect(() => {
    window.addEventListener(AppAction.OpenApp, () => setState(AppState.Opened))
    window.addEventListener(AppAction.CloseApp, () => setState(AppState.Closed))
  }, [])

  return { getAppState: state }
}
