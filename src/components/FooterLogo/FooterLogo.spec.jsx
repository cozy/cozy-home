import React from 'react'
import { render, screen } from '@testing-library/react'

import { FooterLogo } from './FooterLogo'

describe('FooterLogo', () => {
  const mockClient = {
    getStackClient: () => mockClient,
    uri: 'http://cozy.example.com',
    fetchJSON: jest.fn()
  }

  it('should render nothing when there are no logos', () => {
    mockClient.fetchJSON.mockResolvedValue({
      data: {
        attributes: {}
      }
    })
    render(<FooterLogo client={mockClient} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('should render multiple logos', async () => {
    mockClient.fetchJSON.mockResolvedValue({
      data: {
        attributes: {
          home_logos: {
            '/path1/cozy.svg': 'alt text 1',
            '/path/2/cozy-with_complex-name.svg': 'alt text 2'
          }
        }
      }
    })
    render(<FooterLogo client={mockClient} />)
    expect((await screen.findAllByRole('img')).length).toEqual(2)
  })
})
