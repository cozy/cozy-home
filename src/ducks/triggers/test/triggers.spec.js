/* eslint-env jest */

import { buildKonnectorTrigger } from '../'

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
})
