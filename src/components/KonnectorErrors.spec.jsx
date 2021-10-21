import React from 'react'
import MockDate from 'mockdate'
import { KonnectorErrors } from './KonnectorErrors'
import AppLike from '../../test/AppLike'
import { render, fireEvent } from '@testing-library/react'

jest.mock('cozy-ui/transpiled/react/AppIcon', () => () => null)

describe('KonnectorErrors', () => {
  const MOCKED_DATE = '2020-01-08T09:49:23.589Z'
  beforeAll(() => {
    MockDate.set(MOCKED_DATE)
  })

  afterAll(() => {
    jest.restoreAllMocks()
    MockDate.reset()
  })

  const mockClient = {
    save: jest.fn()
  }

  const mockHistory = {}

  const DEFAULT_INSTALLED_KONNECTORS = [
    { slug: 'test', name: 'Test Konnector' }
  ]

  const setup = ({
    triggersInError = [],
    accountsWithErrors = [],
    installedKonnectors = DEFAULT_INSTALLED_KONNECTORS
  } = {}) => {
    const root = render(
      <AppLike client={mockClient}>
        <KonnectorErrors
          triggersInError={triggersInError}
          accountsWithErrors={accountsWithErrors}
          installedKonnectors={installedKonnectors}
          history={mockHistory}
        />
      </AppLike>
    )
    return { root }
  }

  it('should render divider when there are no errors', () => {
    const { root } = setup()
    expect(root.container).toMatchSnapshot()
  })

  it('should render divider when there are errors but no installed konnector', () => {
    const triggersInError = [
      {
        _id: '2',
        worker: 'konnector',
        current_state: {
          last_error: 'MUTED_ERROR',
          last_success: '2019-10-01T00:48:01.404911778Z'
        },
        message: {
          konnector: 'test',
          account: '456'
        }
      }
    ]
    const { root } = setup({ triggersInError })

    expect(root.container).toMatchSnapshot()
  })

  it('should render divider when all errors are muted', () => {
    const triggersInError = [
      {
        _id: '2',
        worker: 'konnector',
        current_state: {
          last_error: 'MUTED_ERROR',
          last_success: '2019-10-01T00:48:01.404911778Z'
        },
        message: {
          konnector: 'test',
          account: '456'
        }
      }
    ]
    const accountsWithErrors = [
      {
        _id: '456',
        mutedErrors: [
          {
            type: 'MUTED_ERROR',
            mutedAt: '2019-12-01T00:48:01.404911778Z'
          }
        ]
      }
    ]
    const installedKonnectors = [{ slug: 'test', name: 'Test Konnector' }]

    const { root } = setup({
      triggersInError,
      accountsWithErrors,
      installedKonnectors
    })

    expect(root.container).toMatchSnapshot()
  })

  it('should render active errors', async () => {
    const triggersInError = [
      {
        _id: '1',
        worker: 'konnector',
        current_state: {
          last_error: 'LOGIN_FAILED'
        },
        message: {
          konnector: 'test',
          account: '123'
        }
      },
      {
        _id: '2',
        worker: 'konnector',
        current_state: {
          last_error: 'LOGIN_FAILED.NEEDS_SECRET', // this one is muted
          last_success: '2019-10-01T00:48:01.404911778Z'
        },
        message: {
          konnector: 'test',
          account: '456'
        }
      },
      {
        _id: '3',
        worker: 'konnector',
        current_state: {
          last_error: 'USER_ACTION_NEEDED'
        },
        message: {
          konnector: 'test',
          account: '123'
        }
      },
      {
        _id: '4',
        worker: 'konnector',
        current_state: {
          last_error: 'VENDOR_DOWN' // This type of error is not displayed
        },
        message: {
          konnector: 'test',
          account: '123'
        }
      }
    ]
    const accountsWithErrors = [
      { _id: '123', mutedErrors: [] },
      {
        _id: '456',
        mutedErrors: [
          {
            type: 'LOGIN_FAILED.NEEDS_SECRET',
            mutedAt: '2019-12-01T00:48:01.404911778Z'
          }
        ]
      }
    ]
    const installedKonnectors = [{ slug: 'test', name: 'Test Konnector' }]
    const { root } = setup({
      triggersInError,
      accountsWithErrors,
      installedKonnectors
    })

    expect(
      root.getByText('(1/2) Incorrect or expired credentials')
    ).toBeTruthy()

    const dismissButton = root.getByLabelText('Mute error')
    await fireEvent.click(dismissButton)

    expect(mockClient.save).toHaveBeenCalledWith({
      _id: '123',
      mutedErrors: [{ mutedAt: MOCKED_DATE, type: 'LOGIN_FAILED' }]
    })
  })

  it('should hide errors when the konnector or account is missing', () => {
    const triggersInError = [
      {
        _id: '1',
        worker: 'konnector',
        current_state: {
          last_error: 'LOGIN_FAILED'
        },
        message: {
          konnector: 'uninstalled',
          account: '123'
        }
      },
      {
        _id: '2',
        worker: 'konnector',
        current_state: {
          last_error: 'LOGIN_FAILED'
        },
        message: {
          konnector: 'uninstalled',
          account: 'no-account'
        }
      }
    ]
    const accountsWithErrors = [{ _id: '123', mutedErrors: [] }]
    const installedKonnectors = []
    const { root } = setup({
      triggersInError,
      accountsWithErrors,
      installedKonnectors
    })
    expect(root.container).toMatchSnapshot()
  })

  it('should not show slide indicator with only one slide', () => {
    const triggersInError = [
      {
        _id: '1',
        worker: 'konnector',
        current_state: {
          last_error: 'LOGIN_FAILED'
        },
        message: {
          konnector: 'test',
          account: '123'
        }
      }
    ]
    const accountsWithErrors = [
      { _id: '123', mutedErrors: [] },
      {
        _id: '456',
        mutedErrors: [
          {
            type: 'LOGIN_FAILED.NEEDS_SECRET',
            mutedAt: '2019-12-01T00:48:01.404911778Z'
          }
        ]
      }
    ]
    const installedKonnectors = [{ slug: 'test', name: 'Test Konnector' }]
    const { root } = setup({
      triggersInError,
      accountsWithErrors,
      installedKonnectors
    })

    // 1/1 is not displayed
    expect(root.getByText('Incorrect or expired credentials'))
  })
})
