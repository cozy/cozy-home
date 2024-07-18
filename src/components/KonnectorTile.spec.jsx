'use strict'

/* eslint-env jest */

import React from 'react'
import { render } from '@testing-library/react'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { createMockClient } from 'cozy-client/dist/mock'

import { KonnectorTile, getKonnectorStatus } from 'components/KonnectorTile'
import { STATUS } from 'components/KonnectorHelpers'
import AppLike from 'test/AppLike'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: ({ children }) => children
}))

const mockKonnector = {
  name: 'Mock',
  slug: 'mock',
  available_version: null
}

const getMockProps = ({
  error,
  userError,
  konnector = mockKonnector,
  isInMaintenance = false
} = {}) => ({
  error,
  isInMaintenance,
  userError,
  konnector
})

const TRIGGERS_FIXTURE = [
  {
    type: '@cron',
    id: '55530b40ac03836006d532b4bc1695ed',
    attributes: {
      _id: '55530b40ac03836006d532b4bc1695ed',
      _rev: '1-810ca92d7f595728f37c442026c736c4',
      domain: 'q.cozy.tools:8080',
      prefix: 'cozy971032aab50344a685d8862a25234d2c',
      type: '@cron',
      worker: 'konnector',
      arguments: '0 6 11 * * 4',
      debounce: '',
      options: null,
      message: {
        account: '55530b40ac03836006d532b4bc1667ae',
        konnector: 'alan',
        folder_to_save: '55530b40ac03836006d532b4bc1693b3'
      },
      current_state: {
        trigger_id: '55530b40ac03836006d532b4bc1695ed',
        status: 'errored',
        last_success: '2022-07-28T16:13:49.21131+02:00',
        last_successful_job_id: 'd55d008319889c826304af3f2e00f1a3',
        last_execution: '2023-09-21T21:18:08.10586+02:00',
        last_executed_job_id: '9ad37b194024adbd7c87fb4e770314ac',
        last_failure: '2023-09-21T21:18:08.10586+02:00',
        last_failed_job_id: '9ad37b194024adbd7c87fb4e770314ac',
        last_error: 'VENDOR_DOWN',
        last_manual_execution: '2022-04-07T12:42:53.043043+02:00',
        last_manual_job_id: '55530b40ac03836006d532b4bc194546'
      },
      cozyMetadata: {
        doctypeVersion: '1',
        metadataVersion: 1,
        createdAt: '2022-04-07T12:33:26.676062+02:00',
        createdByApp: 'home',
        updatedAt: '2022-04-07T12:33:26.676062+02:00'
      }
    },
    meta: {},
    links: {
      self: '/jobs/triggers/55530b40ac03836006d532b4bc1695ed'
    }
  }
]

const JOBS_FIXTURE = [
  {
    id: '07d833e78b4db536569d45b94b011f79',
    _id: '07d833e78b4db536569d45b94b011f79',
    _type: 'io.cozy.jobs',
    _rev: '3-313a673f402f469336b523e5d8f86ba6',
    domain: 'q.cozy.localhost:8080',
    prefix: 'cozy062792dddb72cc4438450983d3ccd55a',
    worker: 'konnector',
    trigger_id: '55530b40ac03836006d532b4bc1695ed',
    message: {
      account: '55530b40ac03836006d532b4bc1667ae',
      konnector: 'alan',
      folder_to_save: '55530b40ac03836006d532b4bc1693b3'
    },
    event: null,
    state: 'errored',
    queued_at: '2023-04-28T17:58:29.082924+02:00',
    started_at: '2023-04-28T17:58:29.71011+02:00',
    finished_at: '2023-04-28T17:58:31.847548+02:00',
    error: "Cannot read properties of null (reading 'secret')"
  }
]

const ACCOUNTS_FIXTURE = [
  {
    id: '55530b40ac03836006d532b4bc1667ae',
    _id: '55530b40ac03836006d532b4bc1667ae',
    _type: 'io.cozy.accounts',
    _rev: '56-e8524998a52a44cb812c3a9101d80e81',
    account_type: 'alan',
    auth: {
      credentials_encrypted: 'redacted',
      login: 'alice@cozy.localhost'
    },
    cozyMetadata: {
      createdAt: '2022-04-07T10:29:33.621Z',
      metadataVersion: 1,
      updatedAt: '2022-04-07T10:42:52.828Z',
      updatedByApps: [
        {
          date: '2022-04-07T10:42:52.828Z'
        }
      ]
    },
    defaultFolderPath: '/Administrative/Alan/alice@cozy.localhost',
    identifier: 'login',
    state: 'LOGIN_SUCCESS'
  }
]

const setup = mockProps => {
  const client = createMockClient({
    queries: {
      'io.cozy.triggers': {
        lastUpdate: new Date(),
        data: TRIGGERS_FIXTURE,
        doctype: 'io.cozy.triggers',
        hasMore: false
      },
      'io.cozy.jobs': {
        lastUpdate: new Date(),
        data: JOBS_FIXTURE,
        doctype: 'io.cozy.jobs',
        hasMore: false
      },
      'io.cozy.accounts': {
        lastUpdate: new Date(),
        data: ACCOUNTS_FIXTURE,
        doctype: 'io.cozy.accounts',
        hasMore: false
      }
    }
  })
  return render(
    <AppLike client={client} store={client.store}>
      <CozyTheme>
        <KonnectorTile {...mockProps} />
      </CozyTheme>
    </AppLike>
  )
}

describe('KonnectorTile component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.error.mockRestore()
  })

  it('should render correctly ', () => {
    const mockProps = getMockProps()
    const root = setup(mockProps)
    expect(root.getByText(mockKonnector.name)).toBeTruthy()
  })

  describe('Util methods', () => {
    it('should display correct status if in maintenance', () => {
      const status = getKonnectorStatus({
        konnector: mockKonnector,
        isInMaintenance: true
      })
      expect(status).toEqual(STATUS.MAINTENANCE)
    })

    it('should display correct error status if user error but not in maintenance', () => {
      const status = getKonnectorStatus({
        error: null,
        userError: new Error('Expected test user error')
      })
      expect(status).toEqual(STATUS.ERROR)
    })

    it('should display correct error status if other error but not in maintenance', () => {
      const status = getKonnectorStatus({ error: new Error('LOGIN_FAILED') })
      expect(status).toEqual(STATUS.ERROR)
    })
  })
})
