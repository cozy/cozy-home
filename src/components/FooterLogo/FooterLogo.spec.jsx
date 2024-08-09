import React from 'react'
import { render, screen } from '@testing-library/react'

import { CozyProvider, createMockClient } from 'cozy-client'

import { FooterLogo } from './FooterLogo'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'

describe('FooterLogo', () => {
  const setup = mockLogos => {
    const homeLogos = mockLogos ? { logos: { home: { light: mockLogos } } } : {}
    const mockClient = createMockClient({
      queries: {
        'io.cozy.settings/io.cozy.settings.context': {
          doctype: 'io.cozy.settings',
          definition: {
            doctype: 'io.cozy.settings',
            id: 'io.cozy.settings/context'
          },
          data: [
            {
              id: 'io.cozy.settings/context',
              ...homeLogos
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
        <CozyTheme>
          <FooterLogo />
        </CozyTheme>
      </CozyProvider>
    )
  }

  it('should render nothing when there are no logos', () => {
    setup()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('should render secondaries logo only', () => {
    setup([
      {
        src: '/logo/partner1.png',
        alt: 'Partner n°1',
        type: 'secondary'
      },
      {
        src: '/logo/partner2.png',
        alt: 'Partner n°2',
        type: 'secondary'
      }
    ])

    const images = screen.getAllByAltText(/Partner n°*?/i)
    expect(images.length).toEqual(2)
  })

  it('should render main logo only', () => {
    setup([
      {
        src: '/logo/partner_main.png',
        alt: 'Main partner',
        type: 'main'
      }
    ])

    const image = screen.getByAltText('Main partner')
    expect(image).toBeInTheDocument()
  })

  it('should render both', () => {
    setup([
      {
        src: '/logo/partner_main.png',
        alt: 'Main partner',
        type: 'main'
      },
      {
        src: '/logo/partner1.png',
        alt: 'Partner n°1',
        type: 'secondary'
      },
      {
        src: '/logo/partner2.png',
        alt: 'Partner n°2',
        type: 'secondary'
      }
    ])

    const main = screen.getByAltText('Main partner')
    expect(main).toBeInTheDocument()

    const secondaries = screen.getAllByAltText(/Partner n°*?/i)
    expect(secondaries.length).toEqual(2)
  })
})
