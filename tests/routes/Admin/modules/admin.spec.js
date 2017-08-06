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

})
