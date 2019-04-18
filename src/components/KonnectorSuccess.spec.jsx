import { mount } from 'enzyme'
import KonnectorSuccess, { BanksLink, DriveLink } from './KonnectorSuccess'

describe('KonnectorSuccess', () => {
  let trigger, connector, root
  const setup = () => {
    root = mount(<KonnectorSuccess connector={connector} trigger={trigger} />)
  }

  beforeEach(() => {
    connector = {}
    trigger = { message: {}}
  })

  it('should show drive if trigger has a folder_to_save', () => {
    trigger.message.folder_to_save = 'deadbeef'
    setup()
    expect(root.find(DriveLink)).toBe(true)
  })

  it('should show banks if connector has datatypes with bankAccoutns', () => {
    connector.datatypes = ['bankAccounts']
    setup()
    expect(root.find(BanksLink)).toBe(true)
  })
})
