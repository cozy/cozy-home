import React from 'react'
import { shallow } from 'enzyme'
import ShortcutTile from './ShortcutTile'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useFetchShortcut } from 'cozy-client'
import DeviceBrowserIcon from 'cozy-ui/transpiled/react/Icons/DeviceBrowser'

jest.mock('cozy-client', () => {
  return {
    useClient: () => {},
    useFetchShortcut: jest.fn()
  }
})

jest.mock('cozy-ui/transpiled/react/hooks/useBreakpoints', () => () => ({
  isMobile: false
}))

describe('ShortcutTile', () => {
  it('should render a shortcut tile', () => {
    useFetchShortcut.mockReturnValue({
      shortcutInfos: { data: { attributes: { url: 'http://cozy.io' } } }
    })
    const file = { _id: '123', name: 'cozy.io.url', type: 'file' }
    const comp = shallow(<ShortcutTile file={file} />)
    expect(comp.find('h3').text()).toEqual('cozy.io')
    expect(comp.find('a').prop('href')).toEqual('http://cozy.io')
    expect(comp.find('a').prop('target')).toEqual('_blank')
    expect(comp.find(Icon).prop('icon')).toEqual(DeviceBrowserIcon)
  })

  it('should render a custom icon', () => {
    useFetchShortcut.mockReturnValue({
      shortcutInfos: {
        data: {
          attributes: { url: 'http://cozy.io', metadata: { icon: '<svg />' } }
        }
      }
    })
    const file = { _id: '123', name: 'cozy.io.url', type: 'file' }
    const comp = shallow(<ShortcutTile file={file} />)
    expect(comp.find('img').prop('src')).toEqual(
      'data:image/svg+xml;base64,PHN2ZyAvPg=='
    )
  })
})
