import {
  ADMIN_LOADING,
  ADMIN_EMAILS_RETRIEVED,
  ADMIN_EMAILS_RETRIEVED_ERROR,
  fetchEmails,
  fetchEmailsLoading,
  fetchEmailsOk,
  fetchEmailsError,
  emails,
  loading,
  default as adminReducer
} from 'routes/Admin/modules/admin'
import { baseURL } from 'common'

import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const mockAxios = new MockAdapter(axios)
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('(Redux Module) Admin', () => {
  it('Should export a constant ADMIN_LOADING.', () => {
    expect(ADMIN_LOADING).to.equal('ADMIN_LOADING')
  })

  it('Should export a constant ADMIN_EMAILS_RETRIEVED.', () => {
    expect(ADMIN_EMAILS_RETRIEVED).to.equal('ADMIN_EMAILS_RETRIEVED')
  })

  it('Should export a constant ADMIN_EMAILS_RETRIEVED_ERROR.', () => {
    expect(ADMIN_EMAILS_RETRIEVED_ERROR).to.equal('ADMIN_EMAILS_RETRIEVED_ERROR')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(adminReducer).to.be.a('function')
    })
    it('Should initialize "emails" with empty array', () => {
      let state = emails(undefined, {})
      expect(state).to.eql([])
    })
    it('Should return previous state of mails if an action was not matched', () => {
      let state = emails(undefined, {})
      expect(state).to.be.empty

      state = emails(state,
         {
           type: ADMIN_EMAILS_RETRIEVED,
           payload: [
             { id: 1 }, { id: 2 }
           ]
         }
       )
      expect(state).to.have.lengthOf(2)

      state = emails(state, { type : 'UNKNOWN' })
      expect(state).to.have.lengthOf(2)
    })
    it('Should initialize "loading" with false', () => {
      let state = loading(undefined, {})
      expect(state).to.equal(false)
    })
    it('Should return previous state of loading if an action was not matched', () => {
      let state = loading(undefined, {})
      expect(state).to.equal(false)

      state = loading(state, { type : ADMIN_LOADING })
      expect(state).to.equal(true)

      state = loading(state, { type : 'UNKNOWN' })
      expect(state).to.equal(true)

      state = loading(state, { type : ADMIN_EMAILS_RETRIEVED })
      expect(state).to.equal(false)
    })
  })

  describe('(Action Creator) fetchEmailsLoading', () => {
    it('Should be exported as a function.', () => {
      expect(fetchEmailsLoading).to.be.a('function')
    })

    it('Should return an action with type "ADMIN_LOADING".', () => {
      expect(fetchEmailsLoading()).to.have.property('type', ADMIN_LOADING)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(fetchEmailsLoading()).to.have.property('payload', true)
    })
  })

  describe('(Action Creator) fetchEmailsError', () => {
    it('Should be exported as a function.', () => {
      expect(fetchEmailsError).to.be.a('function')
    })

    it('Should return an action with type "ADMIN_EMAILS_RETRIEVED_ERROR".', () => {
      expect(fetchEmailsError('error')).to.have.property('type', ADMIN_EMAILS_RETRIEVED_ERROR)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(fetchEmailsError('error')).to.have.property('payload', 'error')
    })
  })

  describe('(Action Creator) fetchEmailsOk', () => {
    it('Should be exported as a function.', () => {
      expect(fetchEmailsOk).to.be.a('function')
    })

    it('Should dispatch: "ADMIN_EMAILS_RETRIEVED and ADMIN_EMAILS_RETRIEVED_ERROR".', () => {

      const payload = {
        content : [{ id: 1}],
        number : 1,
        totalElements: 1,
        totalPages: 1,
        size: 1,
        numberOfElements: 1,
        first: 1,
        last: 1
      }

      const expectedActions = [
        {
          type: ADMIN_EMAILS_RETRIEVED,
          payload: [{ id: 1 }]
        },
        {
          type: ADMIN_EMAILS_RETRIEVED_ERROR,
          payload: { number : 1, totalElements: 1, totalPages: 1, size: 1, numberOfElements: 1, first: 1, last: 1 }
        }
      ]

      const store = mockStore({ list : [], pageable: {} }, expectedActions)
      store.dispatch(fetchEmailsOk(payload))
      expect(store.getActions()).to.eql(expectedActions)
    })
  })

  describe('(Action Creator) fetchEmails', () => {
    it('Should be exported as a function.', () => {
      expect(fetchEmails).to.be.a('function')
    })
    it('should retrieve emails', () => {
      mockAxios.reset()
      mockAxios.onGet(`${baseURL}/reviews`).reply(200, [{ id: 1 }])
      const expectedActions = [
        {
          type: ADMIN_LOADING,
          payload: true
        },
        {
          type: ADMIN_EMAILS_RETRIEVED,
          payload: [{ id: 1 }]
        }
      ]

      const store = mockStore({ emails : [] }, expectedActions)
      return store.dispatch(fetchEmails()).then(
        () => expect(store.getActions()).to.eql(expectedActions),
        error => console.log(error)
      )
    })
    it('should got error on retrieve emails', () => {
      mockAxios.reset()
      mockAxios.onGet(`${baseURL}/reviews`).reply(500, { error : 'error' })
      const expectedActions = [
        {
          type: ADMIN_LOADING,
          payload: true
        },
        {
          type: ADMIN_EMAILS_RETRIEVED_ERROR,
          payload: { code: 500, error : 'error' }
        }
      ]

      const store = mockStore({ emails : [] }, expectedActions)
      return store.dispatch(fetchEmails()).then(
        () => expect(store.getActions()).to.eql(expectedActions),
        error => console.log(error)
      )
    })
  })

})
