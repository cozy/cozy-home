/* eslint-env jest */
import client from 'cozy-client'

jest.mock('cozy-client', () => ({
  collection: jest.fn().mockReturnValue({
    add: jest.fn()
  }),
  create: jest.fn(),
  find: jest.fn().mockReturnValue({
    where: jest.fn()
  }),
  get: jest.fn(),
  query: jest.fn()
}))

const fixtures = {
  accountPermissions: {
    source_id: `io.cozy.konnectors/kaggregated`,
    permissions: {
      aggregatorAccount: {
        type: 'io.cozy.accounts',
        verbs: ['GET', 'PUT'],
        values: ['io.cozy.accounts.kaggregated-aggregator']
      }
    }
  },
  konnectorWithAggregator: {
    slug: 'kaggregated',
    aggregator: {
      accountId: 'kaggregated-aggregator'
    }
  },
  simpleAccount: {
    account_type: 'test',
    auth: {
      login: 'login',
      password: 'pass'
    }
  },
  parentAccount: {
    _id: 'kaggregated-aggregator'
  }
}

import { accountsMutations } from './accounts'
const { createAccount, createChildAccount } = accountsMutations(client)

describe('Account mutations', () => {
  beforeEach(() => {
    client.create.mockReset()
    client.create.mockResolvedValue({ data: fixtures.simpleAccount })
  })

  describe('createAccount', () => {
    it('calls Cozy Client and return account', async () => {
      const account = await createAccount(fixtures.simpleAccount)

      expect(client.create).toHaveBeenCalledWith(
        'io.cozy.accounts',
        fixtures.simpleAccount
      )
      expect(account).toEqual(fixtures.simpleAccount)
    })
  })

  describe('createChildAccount', () => {
    const simpleAccountFixtureWithMasterRelation = {
      ...fixtures.simpleAccount,
      relationships: {
        parent: {
          data: {
            _id: 'kaggregated-aggregator',
            _type: 'io.cozy.accounts'
          }
        }
      }
    }

    beforeEach(() => {
      client.query.mockReset()
    })

    it('throws an error when konnector have no aggregator attribute', async () => {
      const konnector = {}
      expect(
        createChildAccount(konnector, fixtures.simpleAccount)
      ).rejects.toEqual(
        new Error('Konnector does not provide aggregator account id')
      )
    })

    it('throws an error when konnector have no aggregator.accountId attribute', async () => {
      const konnector = { aggregator: {} }
      expect(
        createChildAccount(konnector, fixtures.simpleAccount)
      ).rejects.toEqual(
        new Error('Konnector does not provide aggregator account id')
      )
    })

    describe('if parent account does not exists', () => {
      beforeEach(() => {
        client.query.mockReset()
        client.query = jest.fn().mockResolvedValue({ data: [] })
        client.create.mockResolvedValue({
          data: simpleAccountFixtureWithMasterRelation
        })
        client.create.mockResolvedValueOnce({ data: fixtures.parentAccount })
      })

      it('creates parent account', async () => {
        await createChildAccount(
          fixtures.konnectorWithAggregator,
          fixtures.simpleAccount
        )

        expect(client.create).toHaveBeenCalledWith('io.cozy.accounts', {
          _id: fixtures.konnectorWithAggregator.aggregator.accountId
        })
      })

      it('adds permissions to parent account', async () => {
        await createChildAccount(
          fixtures.konnectorWithAggregator,
          fixtures.simpleAccount
        )

        expect(client.collection().add).toHaveBeenCalledWith(
          fixtures.konnectorWithAggregator,
          fixtures.accountPermissions.permissions
        )
      })

      it('creates child account', async () => {
        await createChildAccount(
          fixtures.konnectorWithAggregator,
          fixtures.simpleAccount
        )

        expect(client.create).toHaveBeenCalledWith(
          'io.cozy.accounts',
          simpleAccountFixtureWithMasterRelation
        )
      })

      it('throws error if find fails', async () => {
        client.query.mockReset()
        client.query.mockRejectedValue(new Error('Mocked error'))

        await expect(
          createChildAccount(
            fixtures.konnectorWithAggregator,
            fixtures.simpleAccount
          )
        ).rejects.toEqual(
          new Error(
            'An error occurred when finding parent account kaggregated-aggregator (Mocked error)'
          )
        )
      })

      it('throws error if permission add fails', async () => {
        client
          .collection()
          .add.mockRejectedValueOnce(new Error('Mocked add Error'))
        await expect(
          createChildAccount(
            fixtures.konnectorWithAggregator,
            fixtures.simpleAccount
          )
        ).rejects.toEqual(
          new Error(
            'Cannot set permission for account kaggregated-aggregator (Mocked add Error)'
          )
        )
      })

      it('returns child account', async () => {
        const account = await createChildAccount(
          fixtures.konnectorWithAggregator,
          fixtures.simpleAccount
        )

        expect(account).toEqual(simpleAccountFixtureWithMasterRelation)
      })

      it('throws error if parent account creation fails', async () => {
        client.create.mockReset()
        client.create.mockRejectedValue(new Error('Mocked error'))

        await expect(
          createChildAccount(
            fixtures.konnectorWithAggregator,
            fixtures.simpleAccount
          )
        ).rejects.toEqual(
          new Error(
            'Cannot create parent account kaggregated-aggregator (Mocked error)'
          )
        )
      })

      it('throws error if child account creation fails', async () => {
        client.create.mockReset()
        client.create.mockResolvedValueOnce({ data: fixtures.parentAccount })
        client.create.mockRejectedValue(new Error('Mocked error'))

        await expect(
          createChildAccount(
            fixtures.konnectorWithAggregator,
            fixtures.simpleAccount
          )
        ).rejects.toEqual(new Error('Mocked error'))
      })
    })

    describe('if parent account exists', () => {
      beforeEach(() => {
        client.query.mockReset()
        client.query = jest
          .fn()
          .mockResolvedValue({ data: [fixtures.parentAccount] })
        client.create.mockResolvedValue({
          data: simpleAccountFixtureWithMasterRelation
        })
      })

      it('does not create parent account', async () => {
        await createChildAccount(
          fixtures.konnectorWithAggregator,
          fixtures.simpleAccount
        )

        expect(client.create).not.toHaveBeenCalledWith('io.cozy.accounts', {
          _id: fixtures.konnectorWithAggregator.aggregator.accountId
        })
      })

      it('adds permissions to parent account', async () => {
        await createChildAccount(
          fixtures.konnectorWithAggregator,
          fixtures.simpleAccount
        )

        expect(client.collection().add).toHaveBeenCalledWith(
          fixtures.konnectorWithAggregator,
          fixtures.accountPermissions.permissions
        )
      })

      it('creates child account', async () => {
        await createChildAccount(
          fixtures.konnectorWithAggregator,
          fixtures.simpleAccount
        )

        expect(client.create).toHaveBeenCalledWith(
          'io.cozy.accounts',
          simpleAccountFixtureWithMasterRelation
        )
      })

      it('returns child account', async () => {
        const account = await createChildAccount(
          fixtures.konnectorWithAggregator,
          fixtures.simpleAccount
        )

        expect(account).toEqual(simpleAccountFixtureWithMasterRelation)
      })

      it('throws error if find fails', async () => {
        client.query.mockReset()
        client.query.mockRejectedValue(new Error('Mocked error'))

        await expect(
          createChildAccount(
            fixtures.konnectorWithAggregator,
            fixtures.simpleAccount
          )
        ).rejects.toEqual(
          new Error(
            'An error occurred when finding parent account kaggregated-aggregator (Mocked error)'
          )
        )
      })

      it('throws error if child account creation fails', async () => {
        client.create.mockReset()
        client.create.mockRejectedValueOnce(new Error('Mocked error'))

        await expect(
          createChildAccount(
            fixtures.konnectorWithAggregator,
            fixtures.simpleAccount
          )
        ).rejects.toEqual(new Error('Mocked error'))
      })
    })
  })
})
