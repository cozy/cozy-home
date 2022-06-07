import { renderHook, act } from '@testing-library/react-hooks'

import { useOpenApp, openApp, closeApp, AppState } from './useOpenApp'

test('getAppState should return the correct value in a continuous scenario', () => {
  const { result } = renderHook(() => useOpenApp())
  const expectClosed = { getAppState: AppState.Closed }
  const expectOpen = { getAppState: AppState.Opened }

  expect(result.current).toStrictEqual(expectClosed)

  act(() => {
    openApp()
  })

  expect(result.current).toStrictEqual(expectOpen)

  act(() => {
    openApp()
  })

  expect(result.current).toStrictEqual(expectOpen)

  act(() => {
    closeApp()
  })

  expect(result.current).toStrictEqual(expectClosed)

  act(() => {
    closeApp()
  })

  expect(result.current).toStrictEqual(expectClosed)

  act(() => {
    openApp()
  })

  expect(result.current).toStrictEqual(expectOpen)

  act(() => {
    closeApp()
  })

  expect(result.current).toStrictEqual(expectClosed)
})
