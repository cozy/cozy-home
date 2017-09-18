/* eslint-env jest */

import connections, {
   createConnection,
   updateConnectionError,
   updateConnectionRunningStatus
 } from '../'

describe('Connections Duck', () => {
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
