import React from 'react'
import { shallow } from 'enzyme'
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
    const component = shallow(<FooterLogo client={mockClient} />)
    expect(component.getElement()).toEqual(null)
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
    const component = shallow(<FooterLogo client={mockClient} />)
    await new Promise(resolve => setImmediate(resolve)) // await the didMount
    expect(component.getElement()).toMatchSnapshot()
  })
})
