import CozyClient from 'cozy-client'
import HomeStore, {
  ACCOUNTS_DOCTYPE,
  JOBS_DOCTYPE,
  KONS_DOCTYPE,
  TRIGGERS_DOCTYPE
} from './HomeStore'
import triggers from 'lib/triggers'
import { dummyKonnector } from 'lib/redux-cozy-client/reducer.spec'
import {
  RECEIVE_CREATED_KONNECTOR,
  RECEIVE_DELETED_KONNECTOR,
  RECEIVE_UPDATED_KONNECTOR
} from 'lib/redux-cozy-client/reducer'

const mockSubscribe = jest.fn()
jest.mock('cozy-realtime', () => {
  return {
    __esModule: true,
    default: () => ({ subscribe: mockSubscribe })
  }
})

jest.mock('lib/triggers', () => ({
  fetch: jest.fn()
}))

global.cozy = {
  client: {}
}

describe('HomeStore', () => {
  const setup = () => {
    const context = {}
    const client = new CozyClient({
      uri: 'http://cozy.tools:8080'
    })
    HomeStore.prototype.fetchUrls = jest.fn()
    const store = new HomeStore(context, client)
    store.dispatch = jest.fn()
    store.onTriggerUpdated = jest.fn()
    return { client, store }
  }

  afterEach(() => {
    triggers.fetch.mockReset()
  })

  it('should react to created or updated job', async () => {
    const { store } = setup()
    const unfinishedJob = {
      worker: 'konnector',
      account_deleted: false,
      trigger_id: '1337'
    }

    const foundTrigger = {}
    triggers.fetch.mockResolvedValueOnce(foundTrigger)
    await store.updateUnfinishedJob(unfinishedJob)
    expect(triggers.fetch).toHaveBeenCalledWith(global.cozy.client, '1337')
    expect(store.onTriggerUpdated).toHaveBeenCalledWith(foundTrigger)
  })

  it('should not react to job without trigger', async () => {
    const { store } = setup()
    const unfinishedJob = {
      worker: 'konnector',
      account_deleted: false
    }
    await store.updateUnfinishedJob(unfinishedJob)
    expect(triggers.fetch).not.toHaveBeenCalled()
  })

  it('should not react to job for deleted account', async () => {
    const { store } = setup()
    const unfinishedJob = {
      worker: 'konnector',
      account_deleted: true,
      trigger_id: '1337'
    }
    await store.updateUnfinishedJob(unfinishedJob)
    expect(triggers.fetch).not.toHaveBeenCalled()
  })

  describe('initializeRealtime', () => {
    it('should subscribe to realtime events - on construct', () => {
      // Given
      mockSubscribe.mockReset()

      // When
      setup()

      // Then
      expect(mockSubscribe).toHaveBeenCalledTimes(11)
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        1,
        'created',
        JOBS_DOCTYPE,
        expect.any(Function)
      )
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        2,
        'updated',
        JOBS_DOCTYPE,
        expect.any(Function)
      )
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        3,
        'created',
        ACCOUNTS_DOCTYPE,
        expect.any(Function)
      )
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        4,
        'updated',
        ACCOUNTS_DOCTYPE,
        expect.any(Function)
      )
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        5,
        'deleted',
        ACCOUNTS_DOCTYPE,
        expect.any(Function)
      )
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        6,
        'created',
        TRIGGERS_DOCTYPE,
        expect.any(Function)
      )
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        7,
        'updated',
        TRIGGERS_DOCTYPE,
        expect.any(Function)
      )
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        8,
        'deleted',
        TRIGGERS_DOCTYPE,
        expect.any(Function)
      )
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        9,
        'created',
        KONS_DOCTYPE,
        expect.any(Function)
      )
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        10,
        'updated',
        KONS_DOCTYPE,
        expect.any(Function)
      )
      expect(mockSubscribe).toHaveBeenNthCalledWith(
        11,
        'deleted',
        KONS_DOCTYPE,
        expect.any(Function)
      )
    })
  })

  describe('onKonnectorCreated', () => {
    it('should dispatch action RECEIVE_CREATED_KONNECTOR', () => {
      // Given
      const { store } = setup()

      // When
      store.onKonnectorCreated(dummyKonnector())

      // Then
      expect(store.dispatch).toHaveBeenCalledWith({
        type: RECEIVE_CREATED_KONNECTOR,
        response: { data: [dummyKonnector()] },
        updateCollections: ['konnectors']
      })
    })
  })

  describe('onKonnectorUpdated', () => {
    it('should dispatch action RECEIVE_CREATED_KONNECTOR', () => {
      // Given
      const { store } = setup()

      // When
      store.onKonnectorUpdated(dummyKonnector())

      // Then
      expect(store.dispatch).toHaveBeenCalledWith({
        type: RECEIVE_UPDATED_KONNECTOR,
        response: { data: [dummyKonnector()] },
        updateCollections: ['konnectors']
      })
    })
  })

  describe('onKonnectorDeleted', () => {
    it('should dispatch action RECEIVE_CREATED_KONNECTOR', () => {
      // Given
      const { store } = setup()

      // When
      store.onKonnectorDeleted(dummyKonnector())

      // Then
      expect(store.dispatch).toHaveBeenCalledWith({
        type: RECEIVE_DELETED_KONNECTOR,
        response: { data: [dummyKonnector()] },
        updateCollections: ['konnectors']
      })
    })
  })
})
