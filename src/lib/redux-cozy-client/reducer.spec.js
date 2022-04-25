import { combineReducers } from 'redux'
import { reducer as cozyReducer } from './index'
import { ACCOUNTS_DOCTYPE, KONS_DOCTYPE, TRIGGERS_DOCTYPE } from '../HomeStore'
import {
  RECEIVE_CREATED_KONNECTOR,
  RECEIVE_DELETED_KONNECTOR,
  RECEIVE_UPDATED_KONNECTOR
} from './reducer'

export const dummyKonnector = konnector => ({
  _type: KONS_DOCTYPE,
  type: 'konnector',
  id: `${KONS_DOCTYPE}/ameli`,
  _id: `${KONS_DOCTYPE}/ameli`,
  name: 'Ameli',
  ...konnector
})

describe('reducer', () => {
  let reducer
  let action
  const now = 1651052463319
  const alanKonnector = dummyKonnector({
    name: 'Alan',
    _id: `${KONS_DOCTYPE}/alan`,
    id: `${KONS_DOCTYPE}/alan`
  })
  const initialDocuments = {
    [ACCOUNTS_DOCTYPE]: {},
    [TRIGGERS_DOCTYPE]: {},
    [KONS_DOCTYPE]: {
      [dummyKonnector().id]: dummyKonnector(),
      [alanKonnector.id]: alanKonnector
    }
  }
  const constructInitialState = state => ({
    cozy: { documents: initialDocuments, ...state }
  })

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(now)
    reducer = combineReducers({ cozy: cozyReducer })
  })

  describe('RECEIVE_DELETED_KONNECTOR', () => {
    beforeEach(() => {
      action = {
        type: RECEIVE_DELETED_KONNECTOR,
        response: { data: [alanKonnector] },
        updateCollections: ['konnectors']
      }
    })

    it('should remove one konnector in the documents', () => {
      // Given
      const documents = {
        [ACCOUNTS_DOCTYPE]: {},
        [TRIGGERS_DOCTYPE]: {},
        [KONS_DOCTYPE]: {
          [dummyKonnector().id]: dummyKonnector(),
          [alanKonnector.id]: alanKonnector
        }
      }
      const initialState = constructInitialState({ documents })

      // When
      const state = reducer(initialState, action)

      // Then
      expect(state.cozy.documents[KONS_DOCTYPE]).toEqual({
        [dummyKonnector().id]: dummyKonnector()
      })
    })

    it('should remove one konnector in the collections', () => {
      // Given
      const collections = {
        ['accounts']: {},
        ['triggers']: {},
        ['konnectors']: {
          type: 'io.cozy.konnectors',
          options: {},
          fetchStatus: 'loaded',
          lastFetch: 1651052463319,
          hasMore: false,
          count: 2,
          ids: ['io.cozy.konnectors/alan', 'io.cozy.konnectors/ameli']
        }
      }
      const initialState = constructInitialState({ collections })

      // When
      const state = reducer(initialState, action)

      // Then
      expect(state.cozy.collections['konnectors']).toEqual({
        type: 'io.cozy.konnectors',
        options: {},
        fetchStatus: 'loaded',
        lastFetch: now,
        hasMore: false,
        count: 1,
        ids: ['io.cozy.konnectors/ameli']
      })
    })
  })

  describe('RECEIVE_CREATED_KONNECTOR', () => {
    beforeEach(() => {
      action = {
        type: RECEIVE_CREATED_KONNECTOR,
        response: { data: [alanKonnector] },
        updateCollections: ['konnectors']
      }
    })

    it('should add one konnector in the documents', () => {
      // Given
      const documents = {
        [ACCOUNTS_DOCTYPE]: {},
        [TRIGGERS_DOCTYPE]: {},
        [KONS_DOCTYPE]: {
          [dummyKonnector().id]: dummyKonnector()
        }
      }
      const initialState = constructInitialState({ documents })

      // When
      const state = reducer(initialState, action)

      // Then
      expect(state.cozy.documents[KONS_DOCTYPE]).toEqual({
        [dummyKonnector().id]: dummyKonnector(),
        [alanKonnector.id]: alanKonnector
      })
    })

    it('should add one konnector in the collections', () => {
      // Given
      const collections = {
        ['accounts']: {},
        ['triggers']: {},
        ['konnectors']: {
          type: 'io.cozy.konnectors',
          options: {},
          fetchStatus: 'loaded',
          lastFetch: 1651052463319,
          hasMore: false,
          count: 1,
          ids: ['io.cozy.konnectors/ameli']
        }
      }
      const initialState = constructInitialState({ collections })

      // When
      const state = reducer(initialState, action)

      // Then
      expect(state.cozy.collections['konnectors']).toEqual({
        type: 'io.cozy.konnectors',
        options: {},
        fetchStatus: 'loaded',
        lastFetch: now,
        hasMore: false,
        count: 2,
        ids: ['io.cozy.konnectors/ameli', 'io.cozy.konnectors/alan']
      })
    })
  })

  describe('RECEIVE_UPDATED_KONNECTOR', () => {
    beforeEach(() => {
      action = {
        type: RECEIVE_UPDATED_KONNECTOR,
        response: { data: [dummyKonnector({ editor: 'Yzoc' })] },
        updateCollections: ['konnectors']
      }
    })

    it('should update one konnector in the documents', () => {
      // Given
      const documents = {
        [ACCOUNTS_DOCTYPE]: {},
        [TRIGGERS_DOCTYPE]: {},
        [KONS_DOCTYPE]: {
          [dummyKonnector().id]: dummyKonnector(),
          [alanKonnector.id]: alanKonnector
        }
      }
      const initialState = constructInitialState({ documents })

      // When
      const state = reducer(initialState, action)

      // Then
      expect(state.cozy.documents[KONS_DOCTYPE]).toEqual({
        [dummyKonnector().id]: dummyKonnector({ editor: 'Yzoc' }),
        [alanKonnector.id]: alanKonnector
      })
    })

    it('should update one konnector in the collections', () => {
      // Given
      const collections = {
        ['accounts']: {},
        ['triggers']: {},
        ['konnectors']: {
          type: 'io.cozy.konnectors',
          options: {},
          fetchStatus: 'loaded',
          lastFetch: 1651052463319,
          hasMore: false,
          count: 1,
          ids: ['io.cozy.konnectors/ameli', 'io.cozy.konnectors/alan']
        }
      }
      const initialState = constructInitialState({ collections })

      // When
      const state = reducer(initialState, action)

      // Then
      expect(state.cozy.collections['konnectors']).toEqual({
        type: 'io.cozy.konnectors',
        options: {},
        fetchStatus: 'loaded',
        lastFetch: now,
        hasMore: false,
        count: 2,
        ids: ['io.cozy.konnectors/ameli', 'io.cozy.konnectors/alan']
      })
    })
  })
})
