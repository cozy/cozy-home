/* eslint-env jest */
import get from 'lodash/get'

import connections, {
  enqueueConnection,
  getConnectionsByKonnector,
  getQueue,
  purgeQueue,
  RECEIVE_DATA
} from '../'

describe('Connections Duck', () => {
  describe('Reducer', () => {
    describe('Receiving data', () => {
      it('should ignore actions without data', () => {
        const initialState = { creation: null, konnectors: {} }

        expect(
          connections(initialState, {
            type: RECEIVE_DATA
          })
        ).toEqual(initialState)
        expect(
          connections(initialState, {
            type: RECEIVE_DATA,
            response: {
              data: { yo: 1 }
            }
          })
        ).toEqual(initialState)
        expect(
          connections(initialState, {
            type: RECEIVE_DATA,
            response: {
              data: []
            }
          })
        ).toEqual(initialState)
      })

      it('should add a new trigger', () => {
        const initialState = { creation: null, konnectors: {} }
        const data = [
          {
            _id: 'trigger-id',
            _type: 'io.cozy.triggers',
            message: {
              konnector: 'my-kon',
              account: 'account 1'
            },
            current_state: {
              status: 'done',
              last_error: null,
              last_execution: '2019-01-01'
            }
          }
        ]
        const newState = connections(initialState, {
          type: RECEIVE_DATA,
          response: {
            data
          }
        })

        expect(Object.keys(newState.konnectors).length).toEqual(1)
        const triggerState = get(
          newState,
          'konnectors.my-kon.triggers.trigger-id'
        )
        expect(triggerState).toBeDefined()
        expect(triggerState.account).toBe('account 1')
        expect(triggerState.hasError).toBe(false)
        expect(triggerState.isRunning).toBe(false)
        expect(triggerState.lastSyncDate).toBe('2019-01-01')
      })

      it('should add a new job', () => {
        const initialState = { creation: null, konnectors: {} }
        const data = [
          {
            _id: 'job-id',
            _type: 'io.cozy.jobs',
            worker: 'konnector',
            trigger_id: 'job-trigger-id',
            state: 'done',
            error: null,
            queued_at: '2019-01-01',
            message: {
              konnector: 'my-kon'
            }
          }
        ]
        const newState = connections(initialState, {
          type: RECEIVE_DATA,
          response: {
            data
          }
        })

        expect(Object.keys(newState.konnectors).length).toEqual(1)
        const triggerState = get(
          newState,
          'konnectors.my-kon.triggers.job-trigger-id'
        )
        expect(triggerState).toBeDefined()
        expect(triggerState.account).toBe(undefined)
        expect(triggerState.hasError).toBe(false)
        expect(triggerState.isRunning).toBe(false)
        expect(triggerState.lastSyncDate).toBe('2019-01-01')
      })
    })

    describe('full trigger informations', () => {
      it('should add a new trigger', () => {
        const initialState = { creation: null, konnectors: {} }
        const data = [
          {
            _id: 'trigger-id',
            _type: 'io.cozy.triggers',
            message: {
              konnector: 'my-kon',
              account: 'account 1'
            },
            current_state: {
              status: 'done',
              last_error: null,
              last_execution: '2019-01-01'
            }
          }
        ]
        const newState = connections(initialState, {
          type: RECEIVE_DATA,
          response: {
            data
          }
        })

        expect(get(newState, 'konnectors.my-kon.triggers.data')).toEqual(data)
      })

      it('should keep the latest version of a trigger', () => {
        const initialState = {
          creation: null,
          konnectors: {
            'my-kon': {
              triggers: {
                data: [
                  {
                    _id: 'trigger-id',
                    _type: 'io.cozy.triggers',
                    message: {
                      konnector: 'my-kon',
                      account: 'account 1'
                    },
                    current_state: {
                      status: 'done',
                      last_error: null,
                      last_execution: '2019-01-01'
                    }
                  }
                ]
              }
            }
          }
        }

        const newConnectorData = {
          _id: 'trigger-id',
          _type: 'io.cozy.triggers',
          message: {
            konnector: 'my-kon',
            account: 'account 1'
          },
          current_state: {
            status: 'done',
            last_error: null,
            last_execution: '2019-02-01'
          }
        }

        const newState = connections(initialState, {
          type: RECEIVE_DATA,
          response: {
            data: [newConnectorData]
          }
        })

        const triggerState = get(newState, 'konnectors.my-kon.triggers.data')
        expect(triggerState.length).toEqual(1)
        expect(triggerState[0]).toEqual(newConnectorData)
      })
    })
  })

  describe('Action creators', () => {
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
  })

  describe('Selectors', () => {
    describe('getConnectionsByKonnector', () => {
      it('returns expected connections', () => {
        const state = {
          konnectors: {
            provider: {
              triggers: {
                '81a548fca81455ec2c2644dd55009990': {
                  account: '81a548fca81455ec2c2644dd55008b52',
                  error: 'LOGIN_FAILED',
                  hasError: true,
                  isConnected: false,
                  isRunning: false
                },
                '63c670ea9d7b11e7b5888c88b1c12d46': {
                  account: '17375ac5a59e4d6585fc7d1e1c75ec74',
                  error: null,
                  hasError: false,
                  isConnected: true,
                  isRunning: true
                }
              }
            }
          }
        }

        const validKonnectors = ['provider']
        const validAccounts = ['81a548fca81455ec2c2644dd55008b52']

        expect(
          getConnectionsByKonnector(
            state,
            'provider',
            validAccounts,
            validKonnectors
          )
        ).toMatchSnapshot()
      })
    })

    describe('getQueue', () => {
      it('returns one queued connection per queued account', () => {
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

        const konnectors = {
          testprovider: {
            name: 'Test Provider',
            slug: 'testprovider'
          }
        }

        const result = getQueue(state, konnectors)

        expect(result).toMatchSnapshot()
      })
    })
  })
})
