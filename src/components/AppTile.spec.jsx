import AppLike from 'test/AppLike'
import AppTileWrapper from './AppTile'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, waitFor, screen } from '@testing-library/react'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'
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

const mockAppUpgrading = {
  _id: 'mock-app-id',
  name: 'mock-app-name',
  slug: 'mock-app-slug',
  state: 'upgrading'
}

describe('<AppTile />', () => {
  it('renders loading icon when app is in installing state', () => {
    const { getByText } = render(
      <AppLike>
        <CozyTheme>
          <I18n dictRequire={() => enLocale} lang="en">
            <AppTileWrapper app={mockAppInstalling} lang="en" />
          </I18n>
        </CozyTheme>
      </AppLike>
    )

    expect(getByText('Installing…')).toBeInTheDocument()
  })

  it('renders loading icon when app is in upgrading state', () => {
    const { getByText } = render(
      <AppLike>
        <CozyTheme>
          <I18n dictRequire={() => enLocale} lang="en">
            <AppTileWrapper app={mockAppUpgrading} lang="en" />
          </I18n>
        </CozyTheme>
      </AppLike>
    )

    expect(getByText('Installing…')).toBeInTheDocument()
  })

  it('renders AppTile when app is in ready state', async () => {
    const { queryByText } = render(
      <AppLike client={mockClient}>
        <CozyTheme>
          <AppTileWrapper app={mockAppReady} lang="en" />
        </CozyTheme>
      </AppLike>
    )

    expect(queryByText('Chargement')).not.toBeInTheDocument()
  })

  it('updates app state from installing to ready and fetches app info', async () => {
    const { rerender } = render(
      <AppLike client={mockClient}>
        <CozyTheme>
          <AppTileWrapper app={mockAppInstalling} lang="en" />
        </CozyTheme>
      </AppLike>
    )

    await act(async () => {
      rerender(
        <AppLike client={mockClient}>
          <CozyTheme>
            <AppTileWrapper app={mockAppReady} lang="en" />
          </CozyTheme>
        </AppLike>
      )
    })

    const appReadyElement = await screen.findByText(
      `${mockAppReady.name_prefix} ${mockAppReady.name}`
    )
    expect(appReadyElement).toBeInTheDocument()
  })

  it('updates app state from upgrading to ready and fetches app info', async () => {
    const { rerender } = render(
      <AppLike client={mockClient}>
        <CozyTheme>
          <AppTileWrapper app={mockAppUpgrading} lang="en" />
        </CozyTheme>
      </AppLike>
    )

    await act(async () => {
      rerender(
        <AppLike client={mockClient}>
          <CozyTheme>
            <AppTileWrapper app={mockAppReady} lang="en" />
          </CozyTheme>
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
        <CozyTheme>
          <AppTileWrapper app={mockAppInstalling} lang="en" />
        </CozyTheme>
      </AppLike>
    )

    await waitFor(() => {
      rerender(
        <AppLike client={mockClient}>
          <CozyTheme>
            <AppTileWrapper app={mockAppInstalling} lang="en" />
          </CozyTheme>
        </AppLike>
      )
    })

    const appReadyElement = await screen.findByText('Installing…')
    expect(appReadyElement).toBeInTheDocument()
  })
})
