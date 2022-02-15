'use strict'

/* eslint-env jest */

import React from 'react'
import { render } from '@testing-library/react'
import { useAppsInMaintenance } from 'cozy-client'
import { createMockClient } from 'cozy-client/dist/mock'
import { Services } from './Services'
import AppLike from '../../test/AppLike'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  useAppsInMaintenance: jest.fn()
}))
// eslint-disable-next-line react/display-name
jest.mock('components/KonnectorTile', () => ({ konnector }) => (
  <div>{konnector.slug}</div>
))
jest.mock('components/KonnectorErrors', () => () => null)
jest.mock('hooks/useRegistryInformation', () => (client, slug) => slug)

jest.mock('cozy-ui/transpiled/react/utils/color', () => ({
  getCssVariableValue: () => '#fff',
  getInvertedCssVariableValue: () => '#fff'
}))

describe('Services component', () => {
  const setup = ({ installedKonnectors, suggestedKonnectorsQuery } = {}) => {
    const client = createMockClient({
      clientOptions: {
        uri: 'http://cozy.tools:8080'
      }
    })
    useAppsInMaintenance.mockReturnValue([])
    const root = render(
      <AppLike client={client}>
        <MuiCozyTheme>
          <Services
            installedKonnectors={installedKonnectors || []}
            suggestedKonnectorsQuery={suggestedKonnectorsQuery || { data: [] }}
          />
        </MuiCozyTheme>
      </AppLike>
    )
    return { root }
  }

  it('should display a list of services', () => {
    const installedKonnectors = [
      { slug: 'test1' },
      { slug: 'test2' },
      { slug: 'test3' }
    ]
    const { root } = setup({ installedKonnectors })
    root.getByText('test1')
    root.getByText('test2')
    root.getByText('test3')
  })

  it('should display the empty component when there are no services', () => {
    const installedKonnectors = []
    const { root } = setup({
      installedKonnectors,
      suggestedKonnectorsQuery: { data: [{ slug: 'suggestion-1' }] }
    })
    expect(root.queryByText('slug1')).toBe(null)
    root.getByText('Start gathering your data!')
    root.getByText(
      'Synchronise your brands with your Cozy to automatically retrieve your data (bills, reimbursements, expenses…)'
    )
  })

  it('should keep show empty component when no services have been installed', () => {
    const { root } = setup({
      installedKonnectors: [],
      suggestedKonnectorsQuery: {
        data: [
          { slug: 'suggestion-1' },
          { slug: 'suggestion-2' },
          { slug: 'test-1' }
        ]
      }
    })
    expect(root.getByText('suggestion-1')).toBeTruthy()
    root.getByText('Start gathering your data!')
    root.getByText(
      'Synchronise your brands with your Cozy to automatically retrieve your data (bills, reimbursements, expenses…)'
    )
  })

  it('should display suggestions after services have been installed', () => {
    const installedKonnectors = [
      { slug: 'test-1' },
      { slug: 'test-2' },
      { slug: 'test-3' }
    ]
    const { root } = setup({
      installedKonnectors,
      suggestedKonnectorsQuery: {
        data: [
          { slug: 'suggestion-1' },
          { slug: 'suggestion-2' },
          { slug: 'test-1' }
        ]
      }
    })
    root.getByText('suggestion-1')
    root.getByText('suggestion-2')
    root.getByText('test-1')
  })
})
