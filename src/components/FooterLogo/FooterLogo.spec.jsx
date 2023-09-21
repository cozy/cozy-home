import React from 'react'
import { render, screen } from '@testing-library/react'

import { CozyProvider, createMockClient } from 'cozy-client'

import { FooterLogo } from './FooterLogo'

describe('FooterLogo', () => {
  const setup = ({ attributes = {} } = {}) => {
    const mockClient = createMockClient({
      queries: {
        'io.cozy.settings/context': {
          doctype: 'io.cozy.settings',
          definition: {
            doctype: 'io.cozy.settings',
            id: 'io.cozy.settings/context'
          },
          data: [
            {
              id: 'io.cozy.settings/context',
              attributes
            }
          ]
        }
      },
      clientOptions: {
        uri: 'http://cozy.example.com'
      }
    })
    render(
      <CozyProvider client={mockClient}>
        <FooterLogo />
      </CozyProvider>
    )
  }

  it('should render nothing when there are no logos', () => {
    setup()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('should render multiple logos', async () => {
    setup({
      attributes: {
        home_logos: {
          '/path1/cozy.svg': 'alt text 1',
          '/path/2/cozy-with_complex-name.svg': 'alt text 2'
        }
      }
    })
    expect((await screen.findAllByRole('img')).length).toEqual(2)
  })
})
