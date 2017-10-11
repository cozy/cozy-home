/* eslint-env jest */
import * as accounts from '../../src/lib/accounts'

const konnectorMock = {
  accounts: [],
  slug: 'mock',
  name: 'Mock',
  vendorLink: 'www.mock.cc',
  dataType: ['bill'],
  category: 'transport',
  fields: {
    'login': {type: 'text'},
    'password': {type: 'password'},
    'folderPath': {type: 'folder', advanced: true}
  }
}

const folderMock = {
  _id: '4d1039c9a419779f70d1dee5f200992a',
  type: 'io.cozy.files',
  attributes: {
    created_at: '2017-06-15T15:43:55.132923456Z',
    dir_id: 'bac3d6ecfe56982d9302f7539c0016f5',
    name: 'Mock',
    path: '/Administrative/Mock',
    tags: [],
    type: 'directory',
    updated_at: '2017-06-15T15:43:55.132923456Z'
  },
  links: {
    self: '/files/bac3d6ecfe56982d9302f7539c01b455'
  }
}

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
    find: jest.fn((doctype, account) => Promise.resolve({ ...account, _rev: '6-0cbc3ce9072cc22ccef03f30256a8d57' })),
    create: jest.fn(() => Promise.resolve()),
    update: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
    defineIndex: jest.fn(() => Promise.resolve(indexMock)),
    query: jest.fn(() => Promise.resolve())
  }
}

beforeEach(() => {
  // clear mocks calls
  cozyMock.data.create.mockClear()
  cozyMock.data.update.mockClear()
  cozyMock.data.delete.mockClear()
  cozyMock.data.defineIndex.mockClear()
  cozyMock.data.query.mockClear()
})

describe('accounts library', () => {
  it('should handle account creation', () => {
    return accounts.create(cozyMock, konnectorMock, accountMock.auth, folderMock._id, 'mock')
      .then(account => {
        expect(cozyMock.data.create.mock.calls.length).toBe(1)
        expect(cozyMock.data.create.mock.calls[0][0]).toBe(accounts.ACCOUNTS_DOCTYPE)
        expect(cozyMock.data.create.mock.calls[0][1]).toEqual({
          name: 'mock',
          account_type: konnectorMock.slug,
          auth: accountMock.auth,
          folderId: folderMock._id
        })
      })
  })

  it('should handle account creation without name', () => {
    return accounts.create(cozyMock, konnectorMock, accountMock.auth, folderMock._id)
      .then(account => {
        expect(cozyMock.data.create.mock.calls.length).toBe(1)
        expect(cozyMock.data.create.mock.calls[0][0]).toBe(accounts.ACCOUNTS_DOCTYPE)
        expect(cozyMock.data.create.mock.calls[0][1]).toEqual({
          name: '',
          account_type: konnectorMock.slug,
          auth: accountMock.auth,
          folderId: folderMock._id
        })
      })
  })

  it('should handle account updating', () => {
    return accounts.update(cozyMock, accountMock, accountMock2)
      .then(account => {
        expect(cozyMock.data.update.mock.calls.length).toBe(1)
        expect(cozyMock.data.update.mock.calls[0][0]).toBe(accounts.ACCOUNTS_DOCTYPE)
        expect(cozyMock.data.update.mock.calls[0][1]).toEqual(accountMock)
        expect(cozyMock.data.update.mock.calls[0][2]).toEqual(accountMock2)
      })
  })

  it('should handle account deletion', () => {
    return accounts._delete(cozyMock, accountMock)
      .then(account => {
        expect(cozyMock.data.delete.mock.calls.length).toBe(1)
        expect(cozyMock.data.delete.mock.calls[0][0]).toBe(accounts.ACCOUNTS_DOCTYPE)
        expect(cozyMock.data.delete.mock.calls[0][1]).toEqual(accountMock)
      })
  })

  it('should handle accounts listing by type', () => {
    const accountType = 'mock'
    return accounts.getAccountsByType(cozyMock, accountType)
      .then(() => {
        // indexing
        expect(cozyMock.data.defineIndex.mock.calls.length).toBe(1)
        expect(cozyMock.data.defineIndex.mock.calls[0][0]).toBe(accounts.ACCOUNTS_DOCTYPE)
        expect(cozyMock.data.defineIndex.mock.calls[0][1]).toEqual([
          'account_type', 'name'
        ])
        // fetching
        expect(cozyMock.data.query.mock.calls.length).toBe(1)
        expect(cozyMock.data.query.mock.calls[0][0]).toBe(indexMock)
        expect(cozyMock.data.query.mock.calls[0][1]).toEqual({
          selector: {'account_type': accountType}
        })

        // "pseudo-caching" test
        return accounts.getAccountsByType(cozyMock, accountType)
          .then(() => {
            // indexing
            // caching so no second call to defineIndex here
            expect(cozyMock.data.defineIndex.mock.calls.length).toBe(1)
            // fetching
            expect(cozyMock.data.query.mock.calls.length).toBe(2)
            expect(cozyMock.data.query.mock.calls[0][0]).toBe(indexMock)
            expect(cozyMock.data.query.mock.calls[0][1]).toEqual({
              selector: {'account_type': accountType}
            })
          })
      })
  })

  it('should throw an error if no accountType to get accounts by type', () => {
    expect(() => {
      return accounts.getAccountsByType(cozyMock)
    }).toThrow(new Error('Missing `accountType` parameter'))
  })

  it('should handle all accounts listing', () => {
    return accounts.getAllAccounts(cozyMock)
      .then(() => {
        // indexing
        // cached index
        expect(cozyMock.data.defineIndex.mock.calls.length).toBe(0)
        // fetching
        expect(cozyMock.data.query.mock.calls.length).toBe(1)
        expect(cozyMock.data.query.mock.calls[0][0]).toBe(indexMock)
        expect(cozyMock.data.query.mock.calls[0][1]).toEqual({
          selector: {'account_type': {'$gt': null}}
        })

        // "pseudo-caching" test
        return accounts.getAllAccounts(cozyMock)
          .then(() => {
            // indexing
            // cached index
            expect(cozyMock.data.defineIndex.mock.calls.length).toBe(0)
            // fetching
            expect(cozyMock.data.query.mock.calls.length).toBe(2)
            expect(cozyMock.data.query.mock.calls[0][0]).toBe(indexMock)
            expect(cozyMock.data.query.mock.calls[0][1]).toEqual({
              selector: {'account_type': {'$gt': null}}
            })
          })
      })
  })
})
