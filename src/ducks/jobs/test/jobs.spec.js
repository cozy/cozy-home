/* eslint-env jest */

import { getTriggerLastJob, isJobRunning } from '../'

describe('Jobs Duck', () => {
  describe('getTriggerLastJob', () => {
    const trigger = {
      _id: 'c60d36cf501a4ab5b38acf5f657982ec'
    }

    it('returns null when empty state', () => {
      expect(getTriggerLastJob({})).toMatchSnapshot()
    })

    it('returns null when empty state', () => {
      expect(
        getTriggerLastJob(
          {
            documents: {
              'io.cozy.jobs': {}
            }
          },
          trigger
        )
      ).toMatchSnapshot()
    })

    it.skip('returns expected unique job', () => {
      expect(
        getTriggerLastJob(
          {
            documents: {
              'io.cozy.jobs': {
                daa147092e1c4a1da8c991cb2a194adc: {
                  _id: 'daa147092e1c4a1da8c991cb2a194adc',
                  trigger_id: 'c60d36cf501a4ab5b38acf5f657982ec'
                }
              }
            }
          },
          trigger
        )
      ).toMatchSnapshot()
    })

    it.skip('returns expected last job', () => {
      expect(
        getTriggerLastJob(
          {
            documents: {
              'io.cozy.jobs': {
                daa147092e1c4a1da8c991cb2a194adc: {
                  _id: 'daa147092e1c4a1da8c991cb2a194adc',
                  trigger_id: 'c60d36cf501a4ab5b38acf5f657982ec',
                  started_at: '2017-11-10T17:31:50.394605866+01:00'
                },
                cda1ef761d3d4924cd44b3491d476fea: {
                  _id: 'cda1ef761d3d4924cd44b3491d476fea',
                  trigger_id: 'c60d36cf501a4ab5b38acf5f657982ec',
                  started_at: '2017-11-10T17:58:50.394605866+01:00'
                }
              }
            }
          },
          trigger
        )
      ).toMatchSnapshot()
    })
  })

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
