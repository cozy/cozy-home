import { Application } from 'cozy-doctypes'

const ACCOUNTS_DOCTYPE = 'io.cozy.accounts'

const schema = {
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
  },
  bankAccounts: {
    doctype: 'io.cozy.bank.accounts',
    attributes: {},
    relationships: {
      checkingsAccount: {
        type: 'has-one',
        doctype: 'io.cozy.bank.accounts'
      },
      owners: {
        type: 'has-many',
        doctype: 'io.cozy.contacts'
      }
    }
  }
}

export default schema
