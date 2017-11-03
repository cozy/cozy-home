/* eslint-env jest */
import * as konnectors from '../../src/lib/konnectors'

// TODO: mutualize this code with jobs
// just to tests calling, results are tested in cozy-client-js
const cozyMock = {
  fetchJSON: jest.fn((method, endpoint, data) => Promise.resolve(data))
}

beforeEach(() => {
  // clear mocks calls
  cozyMock.fetchJSON.mockClear()
})

describe('konnectors lib', () => {
  describe('createTrigger', () => {
    const konnector = { slug: 'test' }
    const account = { _id: '963a51f6cdd34401b0904de32cc5578d' }
    const folder = { _id: 'daa147092e1c4a1da8c991cb2a194adc' }

    const options = {
      frequency: 'weekly',
      day: 1,
      hours: 14,
      minutes: 15
    }

    it('creates a trigger', () => {
      expect.assertions(1)
      return konnectors
        .createTrigger(cozyMock, konnector, account, folder, options)
        .then(data => expect(data).toMatchSnapshot())
    })

    it('creates a trigger without folder', () => {
      expect.assertions(1)
      return konnectors
        .createTrigger(cozyMock, konnector, account, null, options)
        .then(data => expect(data).toMatchSnapshot())
    })
  })
})
