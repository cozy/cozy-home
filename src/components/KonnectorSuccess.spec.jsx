import React from 'react'
import { mount } from 'enzyme'
import KonnectorSuccess, { BanksLink, DriveLink } from './KonnectorSuccess'
import AppLike from './AppLike'

describe('KonnectorSuccess', () => {
  let trigger, connector, root
  const setup = () => {
    root = mount(
      <AppLike>
        <KonnectorSuccess
          account={{}}
          title="Fake title"
          successButtonLabel="Fake label"
          error={null}
          onDone={() => {}}
          connector={connector}
          trigger={trigger}
        />
      </AppLike>
    )
  }

  beforeEach(() => {
    connector = {}
    trigger = { message: {} }
  })

  it('should not show drive if trigger has no folder_to_save', () => {
    setup()
    expect(root.find(DriveLink).length).toBe(0)
  })

  it('should show drive if trigger has a folder_to_save', () => {
    trigger.message.folder_to_save = 'deadbeef'
    setup()
    expect(root.find(DriveLink).length).toBe(1)
  })

  it('should show banks if connector has datatypes with bankAccounts', () => {
    connector.data_types = ['bankAccounts']
    setup()
    expect(root.find(DriveLink).length).toBe(0)
    expect(root.find(BanksLink).length).toBe(1)
  })
})
