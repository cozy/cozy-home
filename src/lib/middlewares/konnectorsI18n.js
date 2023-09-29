import { extend as extendI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'

const extendI18nWithKonnector = lang => konnector => {
  const { langs, locales } = konnector

  const hasLangs = langs && langs.length
  if (!hasLangs) {
    // eslint-disable-next-line no-console
    console.warn(`Konnector ${konnector.name} does not specify any lang`)
    return konnector
  }

  const providesLang = hasLangs && langs.includes(lang)
  const actualLang = providesLang ? lang : langs[0]

  const localeKeys = locales && Object.keys(locales)
  const providesLocales =
    localeKeys && localeKeys.length && localeKeys.includes(actualLang)

  if (!providesLocales) {
    // eslint-disable-next-line no-console
    console.warn(
      `Konnector ${konnector.name} does not specify any locale for lang ${actualLang}`
    )
    return konnector
  }

  extendI18n({ [konnector.slug]: locales[actualLang] })
  return konnector
}

export const konnectorsI18nMiddleware = lang => () => next => action => {
  const { response } = action
  switch (action.type) {
    case 'RECEIVE_DATA':
    case 'RECEIVE_NEW_DOCUMENT':
      if (response && action.doctype === KONNECTORS_DOCTYPE) {
        const konnectors = response.data
        konnectors &&
          konnectors.length &&
          konnectors.forEach(extendI18nWithKonnector(lang))
      }
      break
  }

  return next(action)
}

export default konnectorsI18nMiddleware
