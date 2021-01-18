import { KonnectorInstall } from 'components/KonnectorInstall'
import React from 'react'
import { mount } from 'enzyme'
import { IntentTriggerManager } from 'cozy-harvest-lib'

jest.mock('cozy-harvest-lib', () => {
  const FakeIntentTriggerManager = () => <div>Fake trigger manager</div>

  return {
    IntentTriggerManager: FakeIntentTriggerManager
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

    const triggerManager = wrapper.find(IntentTriggerManager)

    expect(triggerManager.props().vaultClosable).toBe(false)
  })
})
