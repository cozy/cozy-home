/* eslint-env jest */

import {
  buildKonnectorTrigger,
  buildTriggerFrequencyOptions,
  isTriggerRunning
} from '../'

describe('Trigger Duck', () => {
  const konnector = { slug: 'test' }

  const options = {
    frequency: 'weekly',
    day: 1,
    hours: 14,
    minutes: 15
  }

  describe('buildKonnectorTrigger', () => {
    const account = { _id: '963a51f6cdd34401b0904de32cc5578d' }
    const folder = { _id: 'daa147092e1c4a1da8c991cb2a194adc' }

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

    it('creates a trigger with a daily frequency', () => {
      const dailyKonnector = { ...konnector, frequency: 'daily' }
      expect(
        buildKonnectorTrigger(dailyKonnector, account, null, options)
      ).toMatchSnapshot()
    })

    it('creates a trigger with an hourly frequency', () => {
      const hourlyKonnector = { ...konnector, frequency: 'hourly' }
      expect(
        buildKonnectorTrigger(hourlyKonnector, account, null, options)
      ).toMatchSnapshot()
    })
  })

  describe('buildTriggerFrequencyOptions', () => {
    it('creates default weekly options', () => {
      expect(buildTriggerFrequencyOptions(konnector, options)).toMatchSnapshot()
    })

    it('creates daily options', () => {
      const konnector = {
        frequency: 'daily'
      }

      expect(buildTriggerFrequencyOptions(konnector, options)).toMatchSnapshot()
    })

    it('creates hourly options', () => {
      const konnector = {
        frequency: 'hourly'
      }

      expect(buildTriggerFrequencyOptions(konnector, options)).toMatchSnapshot()
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
})
