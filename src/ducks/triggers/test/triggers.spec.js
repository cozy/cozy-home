/* eslint-env jest */

import { buildKonnectorTrigger, isTriggerRunning } from '../'

describe('Trigger Duck', () => {
  describe('buildKonnectorTrigger', () => {
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
      expect(
        buildKonnectorTrigger(konnector, account, folder, options)
      ).toMatchSnapshot()
    })

    it('creates a trigger without folder', () => {
      expect(
        buildKonnectorTrigger(konnector, account, null, options)
      ).toMatchSnapshot()
    })
  })

  describe('isTriggerRunning', () => {
    const state = {
      running: [
        'cd8426feed174c0e8e5b9c6d5708abc0',
        '7ab63475e30645b19aedb5cec533a8d6'
      ]
    }

    it('returns false', () => {
      expect(
        isTriggerRunning(state, { _id: '2fb5cff5edcd43f8ad4fbb2b2fe3c6b9' })
      ).toBe(false)
    })

    it('returns true', () => {
      expect(
        isTriggerRunning(state, { _id: '7ab63475e30645b19aedb5cec533a8d6' })
      ).toBe(true)
    })
  })
  //
  // describe('getKonnectorConnectedAccount', () => {
  //   it('returns null when no account', () => {
  //     const konnector = {
  //       _id
  //     }
  //
  //     expect(getKonnectorConnectedAccount(state, konnector)).toMatchSnapshot()
  //   })
  //
  //
  //   it('returns connected account', () => {
  //
  //   })
  // })
  //
  // describe('getTriggerByKonnector', () => {
  //   it('returns konnector associated trigger', () => {
  //
  //   })
  // })
})
