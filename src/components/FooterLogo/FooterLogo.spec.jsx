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

  it('should render secondaries logo only', () => {
    setup({
      attributes: {
        home_logos: {
          '/logo/1_partner.svg': 'Partner n°1',
          '/logo/2_partner.svg': 'Partner n°2'
        }
      }
    })

    const images = screen.getAllByAltText(/Partner n°*?/i)
    expect(images.length).toEqual(2)
  })

  it('should render main logo only', () => {
    setup({
      attributes: {
        home_logos: {
          '/lgoo/main_partner.svg': 'Main partner'
        }
      }
    })

    const image = screen.getByAltText('Main partner')
    expect(image).toBeInTheDocument()
  })

  it('should render both', () => {
    setup({
      attributes: {
        home_logos: {
          '/lgoo/main_partner.svg': 'Main partner',
          '/logo/1_partner.svg': 'Partner n°1',
          '/logo/2_partner.svg': 'Partner n°2'
        }
      }
    })

    const main = screen.getByAltText('Main partner')
    expect(main).toBeInTheDocument()

    const secondaries = screen.getAllByAltText(/Partner n°*?/i)
    expect(secondaries.length).toEqual(2)
  })
})
