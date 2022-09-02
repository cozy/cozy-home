import React from 'react'
import { render, screen } from '@testing-library/react'

import AppLike from 'test/AppLike'
import KonnectorSuccess from './KonnectorSuccess'

// @TODO: some pretty ugly mocks here because the app uses different react-redux versions
jest.mock('react-redux/lib/utils/Subscription', () => ({
  createSubscription: () => ({
    trySubscribe: () => jest.fn(),
    tryUnsubscribe: () => jest.fn(),
    notifyNestedSubs: () => jest.fn()
  })
}))

jest.mock(
  'cozy-client/node_modules/react-redux/lib/utils/Subscription',
  () => ({
    __esModule: true,
    default: () => ({
      trySubscribe: () => jest.fn(),
      tryUnsubscribe: () => jest.fn()
    })
  })
)

describe('KonnectorSuccess', () => {
  let trigger, connector
  const fakeStore = {
    banksUrl: 'https://example-banks.mycozy.cloud',
    getState: () => ({}),
    subscribe: () => ({}),
    dispatch: () => ({})
  }
  const setup = () => {
    render(
      <AppLike store={fakeStore}>
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
    expect(
      screen.queryByText('Open the folder in Cozy Drive')
    ).not.toBeInTheDocument()
  })

  it('should show drive if trigger has a folder_to_save', async () => {
    trigger.message.folder_to_save = 'deadbeef'
    setup()
    expect(
      await screen.findByText('Open the folder in Cozy Drive')
    ).toBeInTheDocument()
  })

  it('should show banks if connector has datatypes with bankAccounts', async () => {
    connector.data_types = ['bankAccounts']
    setup()
    expect(
      screen.queryByText('Open the folder in Cozy Drive')
    ).not.toBeInTheDocument()
    expect(
      await screen.findByText('See my accounts in Cozy Banks')
    ).toBeInTheDocument()
  })
})
