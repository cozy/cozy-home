import React from 'react'
import { shallow } from 'enzyme'
import MockDate from 'mockdate'
import { KonnectorErrors } from './KonnectorErrors'

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

  it('should render nothing when there are no errors', () => {
    const component = shallow(
      <KonnectorErrors
        t={s => s}
        triggersInError={[]}
        accountsWithErrors={[]}
        installedKonnectors={[{ slug: 'test', name: 'Test Konnector' }]}
        history={mockHistory}
        client={mockClient}
      />
    )

    expect(component.html()).toBe(null)
  })

  it('should render nothing when all errors are muted', () => {
    const component = shallow(
      <KonnectorErrors
        t={s => s}
        triggersInError={[
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
        ]}
        accountsWithErrors={[
          {
            _id: '456',
            mutedErrors: [
              {
                type: 'MUTED_ERROR',
                mutedAt: '2019-12-01T00:48:01.404911778Z'
              }
            ]
          }
        ]}
        installedKonnectors={[{ slug: 'test', name: 'Test Konnector' }]}
        history={mockHistory}
        client={mockClient}
      />
    )

    expect(component.html()).toBe(null)
  })

  it('should render all the errors', () => {
    const component = shallow(
      <KonnectorErrors
        t={s => s}
        triggersInError={[
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
              last_error: 'MUTED_ERROR',
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
              last_error: 'USER_ACTION_REQUIRED'
            },
            message: {
              konnector: 'test',
              account: '123'
            }
          }
        ]}
        accountsWithErrors={[
          { _id: '123', mutedErrors: [] },
          {
            _id: '456',
            mutedErrors: [
              {
                type: 'MUTED_ERROR',
                mutedAt: '2019-12-01T00:48:01.404911778Z'
              }
            ]
          }
        ]}
        installedKonnectors={[{ slug: 'test', name: 'Test Konnector' }]}
        history={mockHistory}
        client={mockClient}
      />
    )
    expect(component.find('InfosCarrousel').children().length).toEqual(2)

    const infosComponent = component.find('InfosCarrousel').childAt(0)
    infosComponent.props().dismissAction()
    expect(mockClient.save).toHaveBeenCalledWith({
      _id: '123',
      mutedErrors: [{ mutedAt: MOCKED_DATE, type: 'LOGIN_FAILED' }]
    })
  })

  it('should hide errors when the konnector or account is missing', () => {
    const component = shallow(
      <KonnectorErrors
        t={s => s}
        triggersInError={[
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
        ]}
        accountsWithErrors={[{ _id: '123', mutedErrors: [] }]}
        installedKonnectors={[]}
        history={mockHistory}
        client={mockClient}
      />
    )
    expect(component.find('InfosCarrousel').children().length).toEqual(0)
  })
})
