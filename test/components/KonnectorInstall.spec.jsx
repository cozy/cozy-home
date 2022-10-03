import React from 'react'
import { render, screen } from '@testing-library/react'

import { KonnectorInstall } from 'components/KonnectorInstall'

jest.mock('cozy-harvest-lib', () => {
  const FakeIntentTriggerManager = props => (
    <div>
      <span data-testid="vault-status">
        Vault is {props.vaultClosable ? 'closable' : 'sealed'}
      </span>
    </div>
  )

  return {
    IntentTriggerManager: FakeIntentTriggerManager
  }
})

describe('KonnectorInstall', () => {
  it('should show a non-closable vault', () => {
    render(
      <KonnectorInstall
        account={{}}
        konnector={{ name: 'konnector' }}
        t={key => key}
      />
    )

    expect(screen.getByTestId('vault-status')).toHaveTextContent(
      'Vault is sealed'
    )
  })
})
