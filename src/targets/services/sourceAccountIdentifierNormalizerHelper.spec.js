import {
  normalizeIdentities,
  normalizeBills
} from './sourceAccountIdentifierNormalizerHelper'

describe('normalizeIdentities', () => {
  it('should normalize identities with the identifier attribute', async () => {
    const client = {
      queryAll: jest.fn().mockImplementationOnce(() => [
        {
          _id: 'identityid',
          _type: 'io.cozy.identities',
          identifier: 'testidentifier',
          cozyMetadata: {
            createdByApp: 'testapp'
          }
        }
      ]),
      saveAll: jest.fn()
    }
    await normalizeIdentities(client)
    expect(client.saveAll).toHaveBeenCalledWith([
      {
        _id: 'identityid',
        _type: 'io.cozy.identities',
        identifier: 'testidentifier',
        cozyMetadata: {
          createdByApp: 'testapp',
          sourceAccountIdentifier: 'testidentifier'
        }
      }
    ])
  })
})

describe('normalizeBills', () => {
  it('should normalize bills with sourceAccountIdentifier attribute', async () => {
    const client = {
      queryAll: jest.fn().mockImplementation(async query => {
        if (query.doctype === 'io.cozy.bills') {
          return [
            {
              _id: 'billid',
              _type: 'io.cozy.bills',
              sourceAccountIdentifier: 'testbillidentifier',
              cozyMetadata: {
                createdByApp: 'testapp'
              }
            }
          ]
        } else if (query.doctype === 'io.cozy.accounts') {
          return []
        } else if (query.doctype === 'io.cozy.files') {
          return []
        }
      }),
      saveAll: jest.fn()
    }
    await normalizeBills(client)
    expect(client.saveAll).toHaveBeenCalledWith([
      {
        _id: 'billid',
        _type: 'io.cozy.bills',
        sourceAccountIdentifier: 'testbillidentifier',
        cozyMetadata: {
          createdByApp: 'testapp',
          sourceAccountIdentifier: 'testbillidentifier'
        }
      }
    ])
  })
  it('should normalize bills with sourceAccount refering to accounts with sourceAccountIdentifier', async () => {
    const client = {
      queryAll: jest.fn().mockImplementation(async query => {
        if (query.doctype === 'io.cozy.bills') {
          return [
            {
              _id: 'billid',
              _type: 'io.cozy.bills',
              cozyMetadata: {
                createdByApp: 'testapp',
                sourceAccount: 'testaccountid'
              }
            }
          ]
        } else if (query.doctype === 'io.cozy.accounts') {
          return [
            {
              _id: 'testaccountid',
              _type: 'io.cozy.accounts',
              cozyMetadata: {
                sourceAccountIdentifier: 'accountSourceAccountIdentifier'
              }
            }
          ]
        } else if (query.doctype === 'io.cozy.files') {
          return []
        }
      }),
      saveAll: jest.fn()
    }
    await normalizeBills(client)
    expect(client.saveAll).toHaveBeenCalledWith([
      {
        _id: 'billid',
        _type: 'io.cozy.bills',
        cozyMetadata: {
          createdByApp: 'testapp',
          sourceAccount: 'testaccountid',
          sourceAccountIdentifier: 'accountSourceAccountIdentifier'
        }
      }
    ])
  })
  it('should normalize bills with sourceAccount refering to accounts with account name or login', async () => {
    const client = {
      queryAll: jest.fn().mockImplementation(async query => {
        if (query.doctype === 'io.cozy.bills') {
          return [
            {
              _id: 'billid',
              _type: 'io.cozy.bills',
              cozyMetadata: {
                createdByApp: 'testapp',
                sourceAccount: 'testaccountid'
              }
            }
          ]
        } else if (query.doctype === 'io.cozy.accounts') {
          return [
            {
              _id: 'testaccountid',
              _type: 'io.cozy.accounts',
              auth: {
                accountName: 'testaccountname'
              }
            }
          ]
        } else if (query.doctype === 'io.cozy.files') {
          return []
        }
      }),
      saveAll: jest.fn()
    }
    await normalizeBills(client)
    expect(client.saveAll).toHaveBeenCalledWith([
      {
        _id: 'billid',
        _type: 'io.cozy.bills',
        cozyMetadata: {
          createdByApp: 'testapp',
          sourceAccount: 'testaccountid',
          sourceAccountIdentifier: 'testaccountname'
        }
      }
    ])
  })
  it('should normalize bills with invoice refering to files with sourceAccountIdentifier metadata', async () => {
    const client = {
      queryAll: jest.fn().mockImplementation(async query => {
        if (query.doctype === 'io.cozy.bills') {
          return [
            {
              _id: 'billid',
              _type: 'io.cozy.bills',
              invoice: 'io.cozy.files:testfileid',
              cozyMetadata: {
                createdByApp: 'testapp'
              }
            }
          ]
        } else if (query.doctype === 'io.cozy.accounts') {
          return []
        } else if (query.doctype === 'io.cozy.files') {
          return [
            {
              _id: 'testfileid',
              _type: 'io.cozy.files',
              cozyMetadata: {
                sourceAccountIdentifier: 'testfilesourceaccountidentifier'
              }
            }
          ]
        }
      }),
      saveAll: jest.fn()
    }
    await normalizeBills(client)
    expect(client.saveAll).toHaveBeenCalledWith([
      {
        _id: 'billid',
        _type: 'io.cozy.bills',
        invoice: 'io.cozy.files:testfileid',
        cozyMetadata: {
          createdByApp: 'testapp',
          sourceAccountIdentifier: 'testfilesourceaccountidentifier'
        }
      }
    ])
  })
  it('should normalize bills with invoice refering to files with sourceAccount refering to account with sourceAccountIdentifier in auth', async () => {
    const client = {
      queryAll: jest.fn().mockImplementation(async query => {
        if (query.doctype === 'io.cozy.bills') {
          return [
            {
              _id: 'billid',
              _type: 'io.cozy.bills',
              invoice: 'io.cozy.files:testfileid',
              cozyMetadata: {
                createdByApp: 'testapp'
              }
            }
          ]
        } else if (query.doctype === 'io.cozy.accounts') {
          return [
            {
              _id: 'testaccountid',
              _type: 'io.cozy.accounts',
              auth: {
                accountName: 'testaccountname'
              }
            }
          ]
        } else if (query.doctype === 'io.cozy.files') {
          return [
            {
              _id: 'testfileid',
              _type: 'io.cozy.files',
              cozyMetadata: {
                sourceAccount: 'testaccountid'
              }
            }
          ]
        }
      }),
      saveAll: jest.fn()
    }
    await normalizeBills(client)
    expect(client.saveAll).toHaveBeenCalledWith([
      {
        _id: 'billid',
        _type: 'io.cozy.bills',
        invoice: 'io.cozy.files:testfileid',
        cozyMetadata: {
          createdByApp: 'testapp',
          sourceAccountIdentifier: 'testaccountname'
        }
      }
    ])
  })
  it('should normalize bills with invoice refering to files with sourceAccount refering to account with sourceAccountIdentifier in cozyMetadata', async () => {
    const client = {
      queryAll: jest.fn().mockImplementation(async query => {
        if (query.doctype === 'io.cozy.bills') {
          return [
            {
              _id: 'billid',
              _type: 'io.cozy.bills',
              invoice: 'io.cozy.files:testfileid',
              cozyMetadata: {
                createdByApp: 'testapp'
              }
            }
          ]
        } else if (query.doctype === 'io.cozy.accounts') {
          return [
            {
              _id: 'testaccountid',
              _type: 'io.cozy.accounts',
              auth: {
                accountName: 'testaccountname'
              },
              cozyMetadata: {
                sourceAccountIdentifier: 'testaccountsourceaccountidentifier'
              }
            }
          ]
        } else if (query.doctype === 'io.cozy.files') {
          return [
            {
              _id: 'testfileid',
              _type: 'io.cozy.files',
              cozyMetadata: {
                sourceAccount: 'testaccountid'
              }
            }
          ]
        }
      }),
      saveAll: jest.fn()
    }
    await normalizeBills(client)
    expect(client.saveAll).toHaveBeenCalledWith([
      {
        _id: 'billid',
        _type: 'io.cozy.bills',
        invoice: 'io.cozy.files:testfileid',
        cozyMetadata: {
          createdByApp: 'testapp',
          sourceAccountIdentifier: 'testaccountsourceaccountidentifier'
        }
      }
    ])
  })
})
