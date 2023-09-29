'use strict'

import { I18n } from 'cozy-ui/transpiled/react/providers/I18n'

const I18nComponent = new I18n({
  lang: 'en',
  defaultLang: 'en',
  dictRequire: lang => require(`../../src/locales/${lang}`)
})

const context = I18nComponent.getChildContext()

export const tMock = context.t

export const fMock = context.f
