/* eslint-env jest */

import { isJobRunning } from '../'

describe('Jobs Duck', () => {
  describe('isJobRunning', () => {
    ;['queued', 'running'].forEach(state => {
      it(`returns true for ${state} job`, () => {
        expect(isJobRunning({}, { state: state })).toMatchSnapshot()
      })
    })
    ;[('done', 'error')].forEach(state => {
      it(`returns true for ${state} job`, () => {
        expect(isJobRunning({}, { state: state })).toMatchSnapshot()
      })
    })
  })
})
