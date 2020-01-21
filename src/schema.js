import { Application } from 'cozy-doctypes'

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

export default {
  app: Application.schema,
  accounts: {
    doctype: ACCOUNTS_DOCTYPE,
    attributes: {},
    relationships: {
      master: {
        type: 'has-one',
        doctype: ACCOUNTS_DOCTYPE
      }
    }
  },
  permissions: {
    doctype: 'io.cozy.permissions',
    attributes: {}
  },
  triggers: {
    doctype: 'io.cozy.triggers'
  },
  jobs: {
    doctype: 'io.cozy.jobs'
  }
}
