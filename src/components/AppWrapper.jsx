/* global __DEVELOPMENT__ */

import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { CozyProvider as LegacyCozyProvider } from 'lib/redux-cozy-client'
import { CozyProvider } from 'cozy-client'
import I18n from 'cozy-ui/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

const dictRequire = lang => require(`locales/${lang}.json`)

const AppWrapper = ({
  store,
  cozyClient,
  legacyClient,
  data,
  context,
  lang,
  children
}) => {
  return (
    <MuiCozyTheme>
      <CozyProvider client={cozyClient}>
        <LegacyCozyProvider
          store={store}
          client={legacyClient}
          domain={data.cozyDomain}
          secure={!__DEVELOPMENT__}
        >
          <ReduxProvider store={store}>
            <I18n lang={lang} dictRequire={dictRequire} context={context}>
              {children}
            </I18n>
          </ReduxProvider>
        </LegacyCozyProvider>
      </CozyProvider>
    </MuiCozyTheme>
  )
}

export default AppWrapper
