jest.mock('lib/triggers', () => ({
  fetch: jest.fn()
}))

import triggers from 'lib/triggers'
import HomeStore from './HomeStore'
import CozyClient from 'cozy-client'

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
})
