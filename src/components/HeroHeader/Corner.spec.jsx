import { render } from '@testing-library/react'
import React from 'react'

import flag from 'cozy-flags'
import { WebviewIntentProvider } from 'cozy-intent'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'

import enLocale from 'locales/en.json'

import Corner from './Corner'

jest.mock(
  './SettingsButton',
  () =>
    function SettingsButton() {
      return <div>Settings</div>
    }
)
jest.mock('cozy-flags', () => {
  return jest.fn().mockReturnValue(null)
})

describe('Corner', () => {
  it('should only render the log out button', () => {
    const root = render(
      <WebviewIntentProvider>
        <BreakpointsProvider>
          <I18n dictRequire={() => enLocale} lang="en">
            <Corner />
          </I18n>
        </BreakpointsProvider>
      </WebviewIntentProvider>
    )

    expect(root.getByText('Log out')).toBeTruthy()
    expect(root.getByText('Help')).toBeTruthy()
    expect(root.queryByText('Settings')).toBeFalsy()
  })

  it('should render buttons based on flags', () => {
    flag.mockImplementation(flagName => {
      if (flagName === 'home.corner.logout-is-displayed') return false
      else if (flagName === 'home.corner.settings-is-displayed') return true
      else if (flagName === 'home.corner.help-is-displayed') return false
      else return null
    })
    const root = render(
      <WebviewIntentProvider>
        <Corner />
      </WebviewIntentProvider>
    )
    expect(root.queryByText('Log out')).toBeFalsy()
    expect(root.getByText('Settings')).toBeTruthy()
    expect(root.queryByText('Help')).toBeFalsy()
  })
})
