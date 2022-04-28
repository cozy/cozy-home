import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { useCustomShortcuts } from './useCustomShortcuts'
import { createMockClient } from 'cozy-client'

import AppLike from 'test/AppLike'

const initialState = { shortcutsDirectories: undefined }
const errorState = { shortcutsDirectories: null }
const missingDirOrFilesState = { shortcutsDirectories: null }
const successState = {
  shortcutsDirectories: [
    { name: '1', shortcuts: [{ attributes: { dir_id: '1' } }] },
    { name: '2', shortcuts: [{ attributes: { dir_id: '2' } }] }
  ]
}

describe('useCustomShortcuts', () => {
  const mockClient = createMockClient({})
  const queryMock = jest.fn()
  mockClient.query = queryMock

  const setup = () => {
    const wrapper = ({ children }) => (
      <AppLike client={mockClient}>{children}</AppLike>
    )

    return renderHook(() => useCustomShortcuts(), {
      wrapper
    })
  }

  it('returns the expected initial state', async () => {
    const { result, waitForNextUpdate } = setup()
    expect(result.current).toEqual(initialState)
    await act(() => waitForNextUpdate())
  })

  it('returns the expected error state', async () => {
    const { result, waitForNextUpdate } = setup()
    await act(() => waitForNextUpdate())
    expect(result.current).toEqual(errorState)
  })

  it('returns the expected state when no magic directory', async () => {
    queryMock.mockResolvedValueOnce()
    const { result, waitForNextUpdate } = setup()
    await act(() => waitForNextUpdate())
    expect(result.current).toEqual(missingDirOrFilesState)
  })

  it('returns the expected state when no directories found', async () => {
    queryMock.mockResolvedValueOnce({ data: [{ id: 1 }] })
    queryMock.mockResolvedValueOnce({})
    const { result, waitForNextUpdate } = setup()
    await act(() => waitForNextUpdate())
    expect(result.current).toEqual(missingDirOrFilesState)
  })

  it('returns the expected state when no shortcuts found', async () => {
    queryMock.mockResolvedValueOnce({ data: [{ id: 1 }] })
    queryMock.mockResolvedValueOnce({
      data: [
        { _id: '1', attributes: { name: '1' } },
        { _id: '2', attributes: { name: '2' } }
      ]
    })
    queryMock.mockResolvedValueOnce({})
    const { result, waitForNextUpdate } = setup()
    await act(() => waitForNextUpdate())
    expect(result.current).toEqual(missingDirOrFilesState)
  })

  it('returns the expected success state', async () => {
    queryMock.mockResolvedValueOnce({ data: [{ id: 1 }] })
    queryMock.mockResolvedValueOnce({
      data: [
        { _id: '1', attributes: { name: '1' } },
        { _id: '2', attributes: { name: '2' } }
      ]
    })
    queryMock.mockResolvedValueOnce({
      data: [{ attributes: { dir_id: '1' } }, { attributes: { dir_id: '2' } }]
    })
    const { result, waitForNextUpdate } = setup()
    await act(() => waitForNextUpdate())
    expect(result.current).toEqual(successState)
  })
})
