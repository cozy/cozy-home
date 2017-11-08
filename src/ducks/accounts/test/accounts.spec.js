/* eslint-env jest */

import { buildAccount } from '../'

describe('Accounts Duck', () => {
  describe('buildAccount', () => {
    const auth = { login: 'testlogin', password: 'testpassword' }

    it('builds an account without name', () => {
      expect(buildAccount(auth)).toMatchSnapshot()
    })

    it('builds an account with a name', () => {
      expect(buildAccount(auth, 'Account Name')).toMatchSnapshot()
    })
  })
})
