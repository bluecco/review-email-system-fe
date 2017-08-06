import {
  REVIEWS_LOADING,
  REVIEWS_RETRIEVED,
  REVIEWS_RETRIEVED_ERROR,
  fetchReviews,
  fetchReviewsLoading,
  fetchReviewsOk,
  fetchReviewsError,
  list,
  loading,
  default as reviewsReducer
} from 'routes/Reviews/modules/reviews'
import { baseURL } from 'common'

import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const mockAxios = new MockAdapter(axios)
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('(Redux Module) Reviews', () => {
  it('Should export a constant REVIEWS_LOADING.', () => {
    expect(REVIEWS_LOADING).to.equal('REVIEWS_LOADING')
  })

  it('Should export a constant REVIEWS_RETRIEVED.', () => {
    expect(REVIEWS_RETRIEVED).to.equal('REVIEWS_RETRIEVED')
  })

  it('Should export a constant REVIEWS_RETRIEVED_ERROR.', () => {
    expect(REVIEWS_RETRIEVED_ERROR).to.equal('REVIEWS_RETRIEVED_ERROR')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(reviewsReducer).to.be.a('function')
    })
    it('Should initialize "list" with empty array', () => {
      let state = list(undefined, {})
      expect(state).to.eql([])
    })
    it('Should return previous state of the list if an action was not matched', () => {
      let state = list(undefined, {})
      expect(state).to.be.empty

      state = list(state, fetchReviewsOk([{ id: 1 }, { id: 2 }]))
      expect(state).to.have.lengthOf(2)

      state = list(state, { type : 'UNKNOWN' })
      expect(state).to.have.lengthOf(2)
    })
    it('Should initialize "loading" with false', () => {
      let state = loading(undefined, {})
      expect(state).to.equal(false)
    })
    it('Should return previous state of loading if an action was not matched', () => {
      let state = loading(undefined, {})
      expect(state).to.equal(false)

      state = loading(state, { type : REVIEWS_LOADING })
      expect(state).to.equal(true)

      state = loading(state, { type : 'UNKNOWN' })
      expect(state).to.equal(true)

      state = loading(state, { type : REVIEWS_RETRIEVED })
      expect(state).to.equal(false)
    })
  })

  describe('(Action Creator) fetchReviewsLoading', () => {
    it('Should be exported as a function.', () => {
      expect(fetchReviewsLoading).to.be.a('function')
    })

    it('Should return an action with type "REVIEWS_LOADING".', () => {
      expect(fetchReviewsLoading()).to.have.property('type', REVIEWS_LOADING)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(fetchReviewsLoading()).to.have.property('payload', true)
    })
  })

  describe('(Action Creator) fetchReviewsOk', () => {
    it('Should be exported as a function.', () => {
      expect(fetchReviewsOk).to.be.a('function')
    })

    it('Should return an action with type "REVIEWS_RETRIEVED".', () => {
      expect(fetchReviewsOk([{ id : 1 }])).to.have.property('type', REVIEWS_RETRIEVED)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(fetchReviewsOk([{ id : 1 }])).to.have.property('payload').to.eql([{ id : 1 }])
    })
  })

  describe('(Action Creator) fetchReviewsError', () => {
    it('Should be exported as a function.', () => {
      expect(fetchReviewsError).to.be.a('function')
    })

    it('Should return an action with type "REVIEWS_RETRIEVED_ERROR".', () => {
      expect(fetchReviewsError('error')).to.have.property('type', REVIEWS_RETRIEVED_ERROR)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(fetchReviewsError('error')).to.have.property('payload', 'error')
    })
  })

  describe('(Action Creator) fetchEmails', () => {
    it('Should be exported as a function.', () => {
      expect(fetchReviews).to.be.a('function')
    })
    it('should retrieve emails', () => {
      mockAxios.reset()
      mockAxios.onGet(`${baseURL}/posts`).reply(200, [{ id: 1 }])
      const expectedActions = [
        {
          type: REVIEWS_LOADING,
          payload: true
        },
        {
          type: REVIEWS_RETRIEVED,
          payload: [{ id: 1 }]
        }
      ]

      const store = mockStore({ emails : [] }, expectedActions)
      return store.dispatch(fetchReviews()).then(
        () => expect(store.getActions()).to.eql(expectedActions),
        error => console.log(error)
      )
    })
    it('should got error on retrieve emails', () => {
      mockAxios.reset()
      mockAxios.onGet(`${baseURL}/posts`).reply(500, { error : 'error' })
      const expectedActions = [
        {
          type: REVIEWS_LOADING,
          payload: true
        },
        {
          type: REVIEWS_RETRIEVED_ERROR,
          payload: { code: 500, error : 'error' }
        }
      ]

      const store = mockStore({ emails : [] }, expectedActions)
      return store.dispatch(fetchReviews()).then(
        () => expect(store.getActions()).to.eql(expectedActions),
        error => console.log(error)
      )
    })
  })
})
