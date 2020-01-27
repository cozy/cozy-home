import { KonnectorInstall } from 'components/KonnectorInstall'
import React from 'react'
import { mount } from 'enzyme'
import { TriggerManager } from 'cozy-harvest-lib'

jest.mock('cozy-harvest-lib', () => {
  const FakeTriggerManager = () => <div>Fake trigger manager</div>

  return {
    TriggerManager: FakeTriggerManager
  }
})

describe('KonnectorInstall', () => {
  it('should show a non-closable vault', () => {
    const wrapper = mount(
      <KonnectorInstall
        account={{}}
        konnector={{ name: 'konnector' }}
        t={key => key}
      />
    )

    const triggerManager = wrapper.find(TriggerManager)

    expect(triggerManager.props().vaultClosable).toBe(false)
  })
})
