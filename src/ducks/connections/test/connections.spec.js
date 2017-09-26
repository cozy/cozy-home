/* eslint-env jest */

import connections, {
   createConnection,
   enqueueConnection,
   getQueue,
   purgeQueue,
   updateConnectionError,
   updateConnectionRunningStatus
 } from '../'

describe('Connections Duck', () => {
  describe('Action creators', () => {
    describe('createConnection', () => {
      it('adds new connection in empty state', () => {
        const state = undefined
        const konnector = { slug: 'cozy' }
        const account = { _id: '9bf93550308311c59f0a0047fc00fa1b' }

        const result = connections(state, createConnection(konnector, account))

        expect(result).toMatchSnapshot()
      })

      it('adds new connection', () => {
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

    describe('enqueueConnection', () => {
      it('marks account as queued', () => {
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
      it('marks all accounts as not queued', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {},
            '63c670ea9d7b11e7b5888c88b1c12d46': {
              isQueued: true
            }
          },
          anotherprovider: {
            '768ccdaa9d7b11e7869aae88b1c12d46': {
              isQueued: true
            }
          }
        }

        const result = connections(state, purgeQueue())

        expect(result).toMatchSnapshot()
      })
    })

    describe('updateConnectionError', () => {
      it('set an error', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {}
          }
        }
        const konnector = { slug: 'testprovider' }
        const account = { _id: '17375ac5a59e4d6585fc7d1e1c75ec74' }
        const error = new Error('test error')

        const result = connections(state, updateConnectionError(konnector, account, error))

        expect(result).toMatchSnapshot()
      })
    })

    describe('updateConnectionRunningStatus', () => {
      it('set a connection to idle', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {}
          }
        }
        const konnector = { slug: 'testprovider' }
        const account = { _id: '17375ac5a59e4d6585fc7d1e1c75ec74' }

        const result = connections(state, updateConnectionRunningStatus(konnector, account, false))

        expect(result).toMatchSnapshot()
      })

      it('set a connection to running', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {}
          }
        }
        const konnector = { slug: 'testprovider' }
        const account = { _id: '17375ac5a59e4d6585fc7d1e1c75ec74' }

        const result = connections(state, updateConnectionRunningStatus(konnector, account, true))

        expect(result).toMatchSnapshot()
      })

      it('set `hasRun` to true when setting `isRunning` from true to false', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {
              isRunning: true
            }
          }
        }
        const konnector = { slug: 'testprovider' }
        const account = { _id: '17375ac5a59e4d6585fc7d1e1c75ec74' }

        const result = connections(state, updateConnectionRunningStatus(konnector, account, false))

        expect(result).toMatchSnapshot()
      })

      it('keeps `hasRun` to true after setting `isRunning` from false to true', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {
              isRunning: false,
              hasRun: true
            }
          }
        }
        const konnector = { slug: 'testprovider' }
        const account = { _id: '17375ac5a59e4d6585fc7d1e1c75ec74' }

        const result = connections(state, updateConnectionRunningStatus(konnector, account, true))

        expect(result).toMatchSnapshot()
      })
    })
  })

  describe('Selectors', () => {
    describe('getQueue', () => {
      it('returns one queued connection per queued account', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {},
            '63c670ea9d7b11e7b5888c88b1c12d46': {
              isRunning: true,
              isQueued: true
            },
            '768ccdaa9d7b11e7869aae88b1c12d46': {
              isQueued: true,
              error: {
                message: 'test error'
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
