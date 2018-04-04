/* eslint-env jest */

import connections, {
  DEFAULT_QUEUE_DELAY,
  createConnection,
  deleteConnection,
  enqueueConnection,
  getConnectedKonnectors,
  getConnectionsByKonnector,
  getQueue,
  launchTriggerAndQueue,
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

    describe('launchTriggerAndQueue', () => {
      jest.useFakeTimers()

      it('enqueues the trigger after defautl delay', () => {
        const trigger = {
          _id: '17375ac5a59e4d6585fc7d1e1c75ec74',
          message: {
            konnector: 'testprovider'
          }
        }

        const connections = {
          konnectors: {
            testprovider: {
              triggers: {
                '17375ac5a59e4d6585fc7d1e1c75ec74': {
                  isRunning: true
                }
              }
            }
          }
        }

        const dispatch = jest.fn()
        const getState = () => ({ connections })
        launchTriggerAndQueue(trigger)(dispatch, getState)

        expect(setTimeout).toHaveBeenCalled()
        expect(setTimeout).toHaveBeenCalledWith(
          expect.any(Function),
          DEFAULT_QUEUE_DELAY
        )

        jest.runOnlyPendingTimers()

        expect(dispatch).toHaveBeenLastCalledWith({
          type: 'ENQUEUE_CONNECTION',
          trigger: trigger
        })
      })

      it('enqueues the trigger after given delay', () => {
        const trigger = {
          _id: '17375ac5a59e4d6585fc7d1e1c75ec74',
          message: {
            konnector: 'testprovider'
          }
        }

        const connections = {
          konnectors: {
            testprovider: {
              triggers: {
                '17375ac5a59e4d6585fc7d1e1c75ec74': {
                  isRunning: true
                }
              }
            }
          }
        }

        const dispatch = jest.fn()
        const getState = () => ({ connections })
        launchTriggerAndQueue(trigger, 350)(dispatch, getState)

        expect(setTimeout).toHaveBeenCalled()
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 350)

        jest.runOnlyPendingTimers()

        expect(dispatch).toHaveBeenLastCalledWith({
          type: 'ENQUEUE_CONNECTION',
          trigger: trigger
        })
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
    describe('getConnectedKonnectors', () => {
      it('returns expected konnectors', () => {
        const state = {
          konnectors: {
            reliable: {
              triggers: {
                e632e37a47044314bd62908df07abe1b: {
                  account: 'ad5531056b5e4c3fa828367c354e4d82'
                },
                '9095f43e15514a8c9ccf28764cf51c3c': {
                  account: '637d16baa5a94488aeacae463b3e8fd5'
                }
              }
            },
            reliableToo: {
              triggers: {
                ee8aae83d53f4825ae9f7b4ee34982d4: {
                  account: '0306125d1ba14405acee4901fc27f982',
                  hasError: true,
                  error: {
                    code: 'LOGIN_FAILED',
                    type: 'LOGIN_FAILED',
                    message: 'LOGIN_FAILED'
                  }
                }
              }
            },
            invalid: {
              triggers: {
                '7fa88b9040664502a6ea43ff760369f5': {
                  account: '45dd6d12cc0c40faa1cf7ddafcc5c55c'
                }
              }
            },
            unexpected: {
              triggers: {
                '7b146c811cd24e6e8d3e34dc69473c25': {
                  account: '69a68c9faaf94dedaa5a53585f676e7a'
                }
              }
            },
            malformed: {}
          }
        }

        const validKonnectors = [
          'reliable',
          'reliableToo',
          'unexpected',
          'malformed'
        ]

        const validAccounts = [
          'ad5531056b5e4c3fa828367c354e4d82',
          '637d16baa5a94488aeacae463b3e8fd5',
          '0306125d1ba14405acee4901fc27f982',
          '45dd6d12cc0c40faa1cf7ddafcc5c55c'
        ]

        expect(
          getConnectedKonnectors(state, validAccounts, validKonnectors)
        ).toEqual(
          expect.arrayContaining([
            { slug: 'reliable', hasUserError: false },
            { slug: 'reliableToo', hasUserError: true }
          ])
        )
      })
    })

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
