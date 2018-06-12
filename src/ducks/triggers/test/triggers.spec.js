/* eslint-env jest */

import { buildKonnectorTrigger, buildTriggerFrequencyOptions } from '../'

describe('Trigger Duck', () => {
  const konnector = { slug: 'test' }

  const options = {
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

    it('creates a trigger with day set to 0', () => {
      const dailyKonnector = { ...konnector, frequency: 'daily' }
      const dailyOptions = { ...options, day: 0 }

      expect(
        buildKonnectorTrigger(dailyKonnector, account, null, dailyOptions)
      ).toMatchSnapshot()
    })

    it('creates a trigger with hours set to 0', () => {
      const dailyKonnector = { ...konnector, frequency: 'daily' }
      const dailyOptions = { ...options, hours: 0 }

      expect(
        buildKonnectorTrigger(dailyKonnector, account, null, dailyOptions)
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
})
