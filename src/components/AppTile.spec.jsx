import AppLike from 'test/AppLike'
import AppTileWrapper from './AppTile'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, waitFor, screen } from '@testing-library/react'
import I18n from 'cozy-ui/transpiled/react/I18n'
import enLocale from 'locales/en.json'

const mockAppReady = {
  _id: 'mock-app-id',
  slug: 'mock-app-slug',
  state: 'ready',
  name: 'mock-app-name',
  name_prefix: 'mock-app-name-prefix',
  links: {
    related: 'https://mock-app.cozy.tools',
    icon: 'https://mock-app.cozy.tools/icon.png'
  }
}

const mockClient = {
  query: jest.fn().mockResolvedValue({
    data: { ...mockAppReady }
  })
}

const mockAppInstalling = {
  _id: 'mock-app-id',
  name: 'mock-app-name',
  slug: 'mock-app-slug',
  state: 'installing'
}

describe('<AppTile />', () => {
  it('renders loading icon when app is in installing state', () => {
    const { getByText } = render(
      <AppLike>
        <MuiCozyTheme>
          <I18n dictRequire={() => enLocale} lang="en">
            <AppTileWrapper app={mockAppInstalling} lang="en" />
          </I18n>
        </MuiCozyTheme>
      </AppLike>
    )

    expect(getByText('Installing…')).toBeInTheDocument()
  })

  it('renders AppTile when app is in ready state', async () => {
    const { queryByText } = render(
      <AppLike client={mockClient}>
        <MuiCozyTheme>
          <AppTileWrapper app={mockAppReady} lang="en" />
        </MuiCozyTheme>
      </AppLike>
    )

    expect(queryByText('Chargement')).not.toBeInTheDocument()
  })

  it('updates app state from installing to ready and fetches app info', async () => {
    const { rerender } = render(
      <AppLike client={mockClient}>
        <MuiCozyTheme>
          <AppTileWrapper app={mockAppInstalling} lang="en" />
        </MuiCozyTheme>
      </AppLike>
    )

    await act(async () => {
      rerender(
        <AppLike client={mockClient}>
          <MuiCozyTheme>
            <AppTileWrapper app={mockAppReady} lang="en" />
          </MuiCozyTheme>
        </AppLike>
      )
    })

    const appReadyElement = await screen.findByText(
      `${mockAppReady.name_prefix} ${mockAppReady.name}`
    )
    expect(appReadyElement).toBeInTheDocument()
  })

  it('does not update app state from installing to ready if app state is not ready', async () => {
    const { rerender } = render(
      <AppLike client={mockClient}>
        <MuiCozyTheme>
          <AppTileWrapper app={mockAppInstalling} lang="en" />
        </MuiCozyTheme>
      </AppLike>
    )

    await waitFor(() => {
      rerender(
        <AppLike client={mockClient}>
          <MuiCozyTheme>
            <AppTileWrapper app={mockAppInstalling} lang="en" />
          </MuiCozyTheme>
        </AppLike>
      )
    })

    const appReadyElement = await screen.findByText('Installing…')
    expect(appReadyElement).toBeInTheDocument()
  })
})
