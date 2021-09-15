import React from 'react'
import { render } from '@testing-library/react'
import Corner from './Corner'
import flag from 'cozy-flags'
import I18n from 'cozy-ui/transpiled/react/I18n'
import enLocale from '../../locales/en.json'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

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
      <BreakpointsProvider>
        <I18n dictRequire={() => enLocale} lang="en">
          <Corner />
        </I18n>
      </BreakpointsProvider>
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
    const root = render(<Corner />)
    expect(root.queryByText('Log out')).toBeFalsy()
    expect(root.getByText('Settings')).toBeTruthy()
    expect(root.queryByText('Help')).toBeFalsy()
  })
})
