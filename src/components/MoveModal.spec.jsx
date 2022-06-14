import React from 'react'
import { render, fireEvent, configure } from '@testing-library/react'
import MoveModal from './MoveModal'
import CozyClient, { CozyProvider } from 'cozy-client'
import AppLike from 'test/AppLike'

configure({ testIdAttribute: 'data-testid' })

const mockUseInstanceSettings = jest.fn()
jest.mock('hooks/useInstanceSettings', () => ({
  useInstanceSettings: () => mockUseInstanceSettings()
}))

describe('MoveModal', () => {
  const setup = () => {
    const client = new CozyClient()
    client.stackClient.fetchJSON = jest.fn()
    const root = render(
      <AppLike>
        <CozyProvider client={client}>
          <MoveModal />
        </CozyProvider>
      </AppLike>
    )
    return { root, client }
  }

  it('should send a delete request and hide itself on close', () => {
    mockUseInstanceSettings.mockReturnValue({
      instanceSettings: { moved_from: 'source.cozy.tools' }
    })
    const { client, root } = setup()
    expect(
      root.getByText(
        'The move of your data from source.cozy.tools has been successful.'
      )
    ).toBeTruthy()

    const closeBtn = root.getByTestId('modal-close-button-0')

    fireEvent.click(closeBtn)
    expect(client.getStackClient().fetchJSON).toHaveBeenCalledWith(
      'DELETE',
      '/settings/instance/moved_from'
    )
    const dialogPaper = root.queryByRole('none')
    expect(dialogPaper.style.opacity).toBe('0')
  })
})
