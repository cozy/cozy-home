/* eslint-env jest */
import * as accounts from '../../src/lib/accounts'

const accountMock = {
  _id: '4d1039c9a419779f70d1dee5f2009b8f',
  _rev: '6-0cbc3ce9072cc22ccef03f30256a8d57',
  account_type: 'mock',
  auth: {
    folderPath: '/Administrative/Mock',
    frequency: 'week',
    login: 'test@mock.cc',
    password: 'khf79NEBDX'
  },
  folderId: '4d1039c9a419779f70d1dee5f200992a',
  name: ''
}

const accountMock2 = {
  _id: '4d1039c9a419779f70d1dee5f200992a',
  account_type: 'mock2',
  auth: {
    folderPath: '/Administrative/Mock2',
    frequency: 'week',
    login: 'test@mock2.cc',
    password: 'khf79dzeNEBDX'
  },
  folderId: '4d1039c9a419779f70d1dee5f2009b8f',
  name: ''
}

const indexMock = {
  doctype: 'io.cozy.accounts',
  fields: ['account_type', 'name'],
  name: '"_design/909cb32a233cf8b2846f0b6373a17dcb8a28a468"',
  type: 'mango'
}

// just to tests calling, results are tested in cozy-client-js
let cozyMock = {
  data: {
    find: jest.fn((doctype, account) =>
      Promise.resolve({
        ...account,
        _rev: '6-0cbc3ce9072cc22ccef03f30256a8d57'
      })
    ),
    create: jest.fn(() => Promise.resolve()),
    updateAttributes: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
    defineIndex: jest.fn(() => Promise.resolve(indexMock)),
    query: jest.fn(() => Promise.resolve())
  }
}

beforeEach(() => {
  // clear mocks calls
  cozyMock.data.create.mockClear()
  cozyMock.data.updateAttributes.mockClear()
  cozyMock.data.delete.mockClear()
  cozyMock.data.defineIndex.mockClear()
  cozyMock.data.query.mockClear()
})

describe('accounts library', () => {
  it('should handle account updating', () => {
    return accounts
      .update(cozyMock, accountMock, accountMock2)
      .then(account => {
        expect(cozyMock.data.updateAttributes.mock.calls.length).toBe(1)
        expect(cozyMock.data.updateAttributes.mock.calls[0][0]).toBe(
          accounts.ACCOUNTS_DOCTYPE
        )
        expect(cozyMock.data.updateAttributes.mock.calls[0][1]).toEqual(
          accountMock._id
        )
        expect(
          cozyMock.data.updateAttributes.mock.calls[0][2]
        ).toMatchSnapshot()
      })
  })

  it('should not update empty password', () => {
    const accountMockWithEmptyPassword = {
      _id: '4d1039c9a419779f70d1dee5f200992a',
      account_type: 'mock3',
      auth: {
        folderPath: '/Administrative/Mock2',
        frequency: 'week',
        login: 'test@mock2.cc',
        password: ''
      },
      folderId: '4d1039c9a419779f70d1dee5f2009b8f',
      name: ''
    }

    return accounts
      .update(cozyMock, accountMock, accountMockWithEmptyPassword)
      .then(account => {
        expect(
          cozyMock.data.updateAttributes.mock.calls[0][2]
        ).toMatchSnapshot()
      })
  })

  it('should handle account deletion', () => {
    return accounts._delete(cozyMock, accountMock).then(account => {
      expect(cozyMock.data.delete.mock.calls.length).toBe(1)
      expect(cozyMock.data.delete.mock.calls[0][0]).toBe(
        accounts.ACCOUNTS_DOCTYPE
      )
      expect(cozyMock.data.delete.mock.calls[0][1]).toEqual(accountMock)
    })
  })
})
