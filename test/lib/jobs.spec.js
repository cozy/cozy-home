/* eslint-env jest */
import * as jobs from '../../src/lib/jobs'

const jobsMock = [
  {
    attributes: {
      _id: 'b7671bbf53e9687e27487b617a0202fd',
      _rev: '3-0138e101246dfa67f80dfaa801ba4dc9',
      domain: 'cozy.tools:8080',
      worker: 'konnector',
      message: {
        konnector: 'trainline',
        account: 'b7671bbf53e9687e27487b617a01ffff',
        folder_to_save: 'b7671bbf53e9687e27487b617a003b6e'
      },
      options: {
        max_exec_count: 1,
        max_exec_time: 0,
        timeout: 0
      },
      state: 'running',
      queued_at: '2017-10-04T15:59:59.737529564+02:00',
      started_at: '2017-10-04T16:00:01.767102968+02:00'
    }
  },
  {
    attributes: {
      _id: 'b7671bbf53e9687e27487b617a0224d7',
      _rev: '3-fed0f44c3a6ccabfe2c3c7b9bef9a0be',
      domain: 'cozy.tools:8080',
      worker: 'konnector',
      message: {
        konnector: 'trainline',
        account: 'b7671bbf53e9687e27487b617a02248c',
        folder_to_save: 'b7671bbf53e9687e27487b617a003b6e'
      },
      options: {
        max_exec_count: 1,
        max_exec_time: 0,
        timeout: 0
      },
      state: 'done',
      queued_at: '2017-10-04T17:06:09.415785346+02:00',
      started_at: '2017-10-04T17:06:09.444339433+02:00'
    }
  }
]

// just to tests calling, results are tested in cozy-client-js
let cozyMock = {
  fetchJSON: jest.fn(() => Promise.resolve(jobsMock))
}

beforeEach(() => {
  // clear mocks calls
  cozyMock.fetchJSON.mockClear()
})

describe('jobs library', () => {
  it('does not ignore old jobs', () => {
    return jobs.findQueuedOrRunning(cozyMock).then(jobs => {
      expect(jobs).toMatchSnapshot()
    })
  })

  it('ignores oldest jobs', () => {
    return jobs
      .findQueuedOrRunning(cozyMock, new Date(Date.UTC(2017, 9, 4, 14)))
      .then(jobs => {
        expect(jobs).toMatchSnapshot()
      })
  })
})
