'use strict'

/* eslint-env jest */

import React from 'react'
import { render } from '@testing-library/react'
import { useAppsInMaintenance } from 'cozy-client'
import { createMockClient } from 'cozy-client/dist/mock'
import { Services } from './Services'
import AppLike from '@/test/AppLike'

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  useAppsInMaintenance: jest.fn()
}))
// eslint-disable-next-line react/display-name
jest.mock('components/KonnectorTile', () => ({ konnector }) => (
  <div>{konnector.slug}</div>
))
jest.mock('hooks/useRegistryInformation', () => (client, slug) => slug)

jest.mock('cozy-ui/transpiled/react/utils/color', () => ({
  createNodeWithThemeCssVars: () => null, // Fix error: "TypeError: (0 , _color.createNodeWithThemeCssVars) is not a function"
  getCssVariableValue: () => '#fff',
  getInvertedCssVariableValue: () => '#fff'
}))

describe('Services component', () => {
  const setup = ({
    installedKonnectors,
    appsAndKonnectorsInMaintenance = []
  } = {}) => {
    const client = createMockClient({
      clientOptions: {
        uri: 'http://cozy.tools:8080'
      },
      queries: {
        installedKonnectors: {
          lastUpdate: new Date(),
          data: installedKonnectors,
          doctype: 'io.cozy.konnectors',
          hasMore: false
        },
        'app-suggestions': {
          lastUpdate: new Date(),
          doctype: 'io.cozy.apps.suggestions',
          hasMore: false
        }
      }
    })

    useAppsInMaintenance.mockReturnValue(appsAndKonnectorsInMaintenance)
    const root = render(
      <AppLike client={client} store={client.store}>
        <Services installedKonnectors={installedKonnectors || []} />
      </AppLike>
    )
    return { root }
  }

  it('should display a list of services', () => {
    const installedKonnectors = [
      { slug: 'test1', _id: '1', name: 'Test1' },
      { slug: 'test2', _id: '2', name: 'Test 2' },
      { slug: 'test3', _id: 3, name: 'Test 3' }
    ]
    const { root } = setup({ installedKonnectors })
    root.getByText('test1')
    root.getByText('test2')
    root.getByText('test3')
  })

  it('should hide category if not enough working konnectors in category', () => {
    const installedKonnectors = []
    const appsAndKonnectorsInMaintenance = [
      { slug: 'engie' },
      { slug: 'planeteoui' },
      { slug: 'veoliaeau' },
      { slug: 'ekwateur' },
      { slug: 'enercoop' }
    ]
    const { root } = setup({
      installedKonnectors,
      appsAndKonnectorsInMaintenance
    })
    expect(root.queryByRole('heading', { name: 'Energy' })).toBeNull
  })
})
