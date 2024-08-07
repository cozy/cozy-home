import * as Sentry from '@sentry/react'
import { useEffect } from 'react'
import {
  Routes,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes
} from 'react-router-dom'

// eslint-disable-next-line import-alias/import-alias
import manifest from '../../manifest.webapp'

Sentry.init({
  dsn: 'https://5d6007cd544cf04ebfb4ea19c4d539e9@errors.cozycloud.cc/82',
  environment: process.env.NODE_ENV,
  release: manifest.version,
  integrations: [
    // We also want to capture the `console.error` to, among other things,
    // report the logs present in the `try/catch
    Sentry.captureConsoleIntegration({ levels: ['error'] }),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes
    })
  ],
  tracesSampleRate: 0.1,
  // React log these warnings(bad Proptypes), in a console.error,
  // it is not relevant to report this type of information to Sentry
  ignoreErrors: [/^Warning: /]
})

export const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)
