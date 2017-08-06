import {
  ADMIN_LOADING,
  ADMIN_EMAILS_RETRIEVED,
  ADMIN_EMAILS_RETRIEVED_ERROR,
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

      state = emails(state, fetchEmailsOk([{ email: "email1" }, { email: "email1" }]))
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

})
