import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import flag from 'cozy-flags'
import { useQuery } from 'cozy-client'

import AppLike from 'test/AppLike'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import AddButton from './AddButton'

import { FLAG_FAB_ACTIONS } from './helpers'

const ACTIONS = [
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
    divider: true
  },
  {
    slug: 'drive',
    path: '/onlyoffice/create/io.cozy.files.root-dir/text',
    icon: 'file-type-text',
    text: {
      fr: 'Texte',
      en: 'Word'
    },
    flag: {
      name: 'drive.onlyoffice.enabled',
      value: 'true'
    }
  }
]

const APPS = [
  {
    name: 'Store',
    slug: 'store'
  },
  {
    name: 'Notes',
    slug: 'notes'
  }
]

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  isQueryLoading: jest.fn(),
  useQuery: jest.fn(),
  useClient: jest.fn().mockImplementation(() => ({
    getStackClient: () => ({
      uri: 'http://cozy.cloud'
    }),
    getInstanceOptions: () => ({
      subdomain: 'flat'
    })
  }))
}))

jest.mock('cozy-flags')

const setup = () => {
  const root = render(
    <AppLike>
      <CozyTheme>
        <AddButton />
      </CozyTheme>
    </AppLike>
  )
  return { root }
}

describe('AddButton', () => {
  it('should display default actions', () => {
    flag.mockImplementation(() => null) // mock fab.actions

    useQuery.mockReturnValue({ data: APPS })

    const { root } = setup()

    expect(root.queryAllByRole('link').length).toBe(0)
    fireEvent.click(root.getByRole('button'))
    expect(root.queryAllByRole('link').length).toBe(6)
  })

  it('should not display button if no action available', () => {
    useQuery.mockReturnValue({ data: [] }) // mock fab.actions

    const { root } = setup()

    expect(root.queryByRole('button')).toBeNull()
  })

  it('should display action and go to app if app installed', () => {
    flag.mockImplementation(() => ACTIONS) // mock fab.actions

    useQuery.mockReturnValue({ data: APPS })

    const { root } = setup()

    expect(root.queryByText('Note')).toBeFalsy()
    fireEvent.click(root.getByRole('button'))
    expect(root.queryByText('Note')).toBeTruthy()

    const link = root.getByRole('link', { name: 'Note' })
    expect(link.href).toBe('http://cozy-notes.cloud/#/new')
  })

  it('should display action and go to store if app not installed', () => {
    flag.mockImplementation(() => ACTIONS) // mock fab.actions

    useQuery.mockReturnValue({ data: [APPS[0]] })

    const { root } = setup()

    expect(root.queryByText('Note')).toBeFalsy()
    fireEvent.click(root.getByRole('button'))
    expect(root.queryByText('Note')).toBeTruthy()

    const link = root.getByRole('link', { name: 'Note' })
    expect(link.href).toBe('http://cozy-store.cloud/#/discover/notes')
  })

  it('should display action if flag condition is true', () => {
    flag.mockImplementation(flag =>
      flag === FLAG_FAB_ACTIONS ? ACTIONS : true
    ) // mock fab.actions and drive.onlyoffice.enabled

    useQuery.mockReturnValue({ data: APPS })

    const { root } = setup()

    expect(root.queryByText('Word')).toBeFalsy()
    fireEvent.click(root.getByRole('button'))
    expect(root.queryByText('Word')).toBeTruthy()
  })

  it('should not display action if flag condition is false', () => {
    flag.mockImplementation(flag =>
      flag === FLAG_FAB_ACTIONS ? ACTIONS : false
    ) // mock fab.actions and drive.onlyoffice.enabled

    useQuery.mockReturnValue({ data: APPS })

    const { root } = setup()

    expect(root.queryByText('Word')).toBeFalsy()
    fireEvent.click(root.getByRole('button'))
    expect(root.queryByText('Word')).toBeFalsy()
  })

  it('should display divider if present', () => {
    flag.mockImplementation(() => ACTIONS) // mock fab.actions

    useQuery.mockReturnValue({ data: APPS })

    const { root } = setup()

    fireEvent.click(root.getByRole('button'))

    expect(root.getAllByRole('separator').length).toBe(2)
  })

  it('should not display divider if not present', () => {
    flag.mockImplementation(() => [ACTIONS[0], ACTIONS[2]]) // mock fab.actions

    useQuery.mockReturnValue({ data: APPS })

    const { root } = setup()

    fireEvent.click(root.getByRole('button'))

    expect(root.getAllByRole('separator').length).toBe(1)
  })
})
