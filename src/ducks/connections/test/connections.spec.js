/* eslint-env jest */

import connections, {
  createConnection,
  deleteConnection,
  enqueueConnection,
  getKonnectorConnectedAccount,
  getQueue,
  purgeQueue,
  updateConnectionError
} from '../'

describe('Connections Duck', () => {
  describe('Action creators', () => {
    describe('createConnection', () => {
      it.skip('adds new connection in empty state', () => {
        const state = undefined
        const konnector = { slug: 'cozy' }
        const account = { _id: '9bf93550308311c59f0a0047fc00fa1b' }

        const result = connections(state, createConnection(konnector, account))

        expect(result).toMatchSnapshot()
      })

      it.skip('adds new connection', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {}
          }
        }
        const konnector = { slug: 'cozy' }
        const account = { _id: '9bf93550308311c59f0a0047fc00fa1b' }

        const result = connections(state, createConnection(konnector, account))

        expect(result).toMatchSnapshot()
      })
    })

    describe('deleteConnection', () => {
      it.skip('deletes existing connection', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {},
            '63c670ea9d7b11e7b5888c88b1c12d46': {}
          }
        }
        const konnector = { slug: 'testprovider' }
        const account = { _id: '17375ac5a59e4d6585fc7d1e1c75ec74' }

        const result = connections(state, deleteConnection(konnector, account))

        expect(result).toMatchSnapshot()
      })
    })

    describe('enqueueConnection', () => {
      it.skip('marks account as queued', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {}
          }
        }
        const konnector = { slug: 'testprovider' }
        const account = { _id: '17375ac5a59e4d6585fc7d1e1c75ec74' }

        const result = connections(state, enqueueConnection(konnector, account))

        expect(result).toMatchSnapshot()
      })
    })

    describe('purgeQueue', () => {
      it.skip('marks all accounts as not queued', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {},
            '63c670ea9d7b11e7b5888c88b1c12d46': {
              isEnqueued: true
            }
          },
          anotherprovider: {
            '768ccdaa9d7b11e7869aae88b1c12d46': {
              isEnqueued: true
            }
          }
        }

        const result = connections(state, purgeQueue())

        expect(result).toMatchSnapshot()
      })
    })

    describe('updateConnectionError', () => {
      it.skip('set an error', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {}
          }
        }
        const konnector = { slug: 'testprovider' }
        const account = { _id: '17375ac5a59e4d6585fc7d1e1c75ec74' }
        const error = new Error('test error')

        const result = connections(
          state,
          updateConnectionError(konnector, account, error)
        )

        expect(result).toMatchSnapshot()
      })
    })
  })

  describe('Selectors', () => {
    describe('getKonnectorConnectedAccount', () => {
      it("returns the first konnector's connected account", () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {},
            '63c670ea9d7b11e7b5888c88b1c12d46': {},
            '768ccdaa9d7b11e7869aae88b1c12d46': {}
          }
        }

        const konnector = { slug: 'testprovider' }

        expect(getKonnectorConnectedAccount(state, konnector)).toMatchSnapshot()
      })

      it.skip('returns null when no konnector is registered with a connection', () => {
        expect(
          getKonnectorConnectedAccount({}, { slug: 'testprovider' })
        ).toMatchSnapshot()
      })

      it.skip('returns null when konnector does not have account', () => {
        const state = {
          testprovider: {}
        }

        const konnector = { slug: 'testprovider' }

        expect(getKonnectorConnectedAccount(state, konnector)).toMatchSnapshot()
      })
    })

    describe('getQueue', () => {
      it.skip('returns one queued connection per queued account', () => {
        const state = {
          data: {
            testprovider: {
              '17375ac5a59e4d6585fc7d1e1c75ec74': {},
              '63c670ea9d7b11e7b5888c88b1c12d46': {
                isRunning: true,
                isEnqueued: true
              },
              '768ccdaa9d7b11e7869aae88b1c12d46': {
                isEnqueued: true,
                error: {
                  message: 'test error'
                }
              }
            }
          }
        }

        const konnectorsRegistry = {
          testprovider: {
            name: 'Test Provider',
            slug: 'testprovider'
          }
        }

        const result = getQueue(state, konnectorsRegistry)

        expect(result).toMatchSnapshot()
      })
    })
  })
})
