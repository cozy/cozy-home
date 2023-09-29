import flag from 'cozy-flags'
import { extend as extendI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const FLAG_FAB_ACTIONS = 'home.fab.actions'
export const FLAG_FAB_BUTTON_ENABLED = 'home.fab.button.enabled'

export const DEFAULT_ACTIONS = [
  {
    slug: 'notes',
    path: '/new',
    icon: 'file-type-note',
    text: {
      fr: 'Note',
      en: 'Note'
    }
  },
  {
    slug: 'drive',
    path: '/onlyoffice/create/io.cozy.files.root-dir/text',
    icon: 'file-type-text',
    text: {
      fr: 'Document texte',
      en: 'Text document'
    },
    flag: [
      {
        name: 'drive.office.touchScreen.enabled',
        value: 'true'
      },
      {
        name: 'drive.office.touchScreen.readOnly',
        value: 'true',
        operator: '$ne'
      }
    ]
  },
  {
    slug: 'drive',
    path: '/onlyoffice/create/io.cozy.files.root-dir/spreadsheet',
    icon: 'file-type-sheet',
    text: {
      fr: 'Feuille de calcul',
      en: 'Spreadsheet'
    },
    flag: [
      {
        name: 'drive.office.touchScreen.enabled',
        value: 'true'
      },
      {
        name: 'drive.office.touchScreen.readOnly',
        value: 'true',
        operator: '$ne'
      }
    ]
  },
  {
    slug: 'drive',
    path: '/onlyoffice/create/io.cozy.files.root-dir/slide',
    icon: 'file-type-slide',
    text: {
      fr: 'Présentation',
      en: 'Presentation'
    },
    flag: [
      {
        name: 'drive.office.touchScreen.enabled',
        value: 'true'
      },
      {
        name: 'drive.office.touchScreen.readOnly',
        value: 'true',
        operator: '$ne'
      }
    ]
  },
  {
    divider: true
  },
  {
    slug: 'mespapiers',
    path: '/paper/create?backgroundPath=/paper',
    icon: 'papers',
    text: {
      fr: 'Papier administratif',
      en: 'Administrative paper'
    }
  },
  {
    slug: 'contacts',
    path: '/new',
    icon: 'contacts',
    text: {
      fr: 'Contact',
      en: 'Contact'
    }
  },
  {
    slug: 'store',
    path: '/discover?type=konnector&category=banking',
    icon: 'file-type-banking-account',
    text: {
      fr: 'Compte bancaire',
      en: 'Bank account'
    }
  },
  {
    slug: 'passwords',
    path: '/vault?action=add',
    icon: 'keychain',
    text: {
      fr: 'Mot de passe',
      en: 'Password'
    }
  },
  {
    divider: true
  },
  {
    slug: 'store',
    path: '/',
    icon: 'store',
    text: {
      fr: 'Application',
      en: 'App'
    }
  }
]

export function hasActionFlagCorrectValue({ name, value, operator }) {
  const flagValue = flag(name) === null ? 'null' : flag(name).toString()
  return operator === '$ne' ? flagValue !== value : flagValue === value
}

export const filterAvailableActions = actions => {
  return actions.filter(action => {
    const actionFlag = action.flag

    if (actionFlag) {
      if (Array.isArray(actionFlag)) {
        return actionFlag.every(hasActionFlagCorrectValue)
      } else {
        return hasActionFlagCorrectValue(actionFlag)
      }
    }

    return true
  })
}

export const reworkActions = (actions, apps) => {
  if (apps.length === 0) return []

  const storeApp = apps.find(app => app.slug === 'store')

  const actionsLists = [[]]

  actions.forEach(action => {
    if (action.divider) {
      actionsLists.push([])
    } else {
      const actionApp = apps.find(app => app.slug === action.slug)
      const actionId = `${action.slug}${action.path}`

      if (actionApp) {
        actionsLists[actionsLists.length - 1].push({
          ...action,
          id: actionId,
          app: actionApp
        })
      } else if (storeApp) {
        actionsLists[actionsLists.length - 1].push({
          ...action,
          id: actionId,
          app: storeApp,
          slug: storeApp.slug,
          path: `/discover/${action.slug}`
        })
      }
    }
  })

  return actionsLists
}

export const extendDict = (actions, lang) => {
  actions.forEach(action => {
    if (!action.divider) {
      extendI18n({
        [action.id]: action.text[lang] || action.text['en']
      })
    }
  })
}
