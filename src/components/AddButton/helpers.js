import flag from 'cozy-flags'
import { extend as extendI18n } from 'cozy-ui/transpiled/react/I18n'

export const FLAG_FAB_ACTIONS = 'home.fab.actions'
export const FLAG_FAB_BUTTON_ENABLED = 'home.fab.button.enabled'

export const DEFAULT_ACTIONS = [
  {
    slug: 'notes',
    path: '/new',
    icon: 'file-type-note',
    text: {
      fr: 'Créer une note',
      en: 'Create a note'
    }
  },
  {
    slug: 'drive',
    path: '/onlyoffice/create/io.cozy.files.root-dir/text',
    icon: 'file-type-text',
    text: {
      fr: 'Traitement de texte',
      en: 'Traitement de texte'
    },
    flag: {
      name: 'drive.onlyoffice.enabled',
      value: 'true'
    }
  },
  {
    slug: 'drive',
    path: '/onlyoffice/create/io.cozy.files.root-dir/spreadsheet',
    icon: 'file-type-sheet',
    text: {
      fr: 'Tableur',
      en: 'Tableur'
    },
    flag: {
      name: 'drive.onlyoffice.enabled',
      value: 'true'
    }
  },
  {
    slug: 'drive',
    path: '/onlyoffice/create/io.cozy.files.root-dir/slide',
    icon: 'file-type-slide',
    text: {
      fr: 'Présentation',
      en: 'Présentation'
    },
    flag: {
      name: 'drive.onlyoffice.enabled',
      value: 'true'
    }
  },
  {
    divider: true
  },
  {
    slug: 'mespapiers',
    path: '/paper/create?backgroundPath=/paper',
    icon: 'papers',
    text: {
      fr: 'Ajouter un papier administratif',
      en: 'Add an administrative paper'
    }
  },
  {
    slug: 'contacts',
    path: '/new',
    icon: 'contacts',
    text: {
      fr: 'Créer un contact',
      en: 'Create a contact'
    }
  },
  {
    slug: 'store',
    path: '/discover?type=konnector&category=banking',
    icon: 'file-type-banking-account',
    text: {
      fr: 'Compte banc.',
      en: 'Banks account'
    }
  },
  {
    slug: 'passwords',
    path: '/vault?action=add',
    icon: 'keychain',
    text: {
      fr: 'Créer un mot de passe',
      en: 'Create a password'
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
      fr: 'Installer une application',
      en: 'Install an app'
    }
  }
]

export const filterAvailableActions = actions => {
  return actions.filter(action =>
    action.flag
      ? flag(action.flag.name) &&
        flag(action.flag.name).toString() === action.flag.value
      : true
  )
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
