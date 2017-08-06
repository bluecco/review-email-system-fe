import {
  ADMIN_ANALYZE_LOADING,
  ADMIN_ANALYZE_OK,
  ADMIN_ANALYZE_ERROR,
  analyzeSentiment,
  analyzeLoading,
  analyzeOk,
  analyzeError,
  analyzing
} from 'routes/Admin/modules/analyze'
import { baseURL } from 'common'

import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const mockAxios = new MockAdapter(axios)
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('(Redux Module) Analyze', () => {
  it('Should export a constant ADMIN_ANALYZE_LOADING.', () => {
    expect(ADMIN_ANALYZE_LOADING).to.equal('ADMIN_ANALYZE_LOADING')
  })

  it('Should export a constant ADMIN_ANALYZE_OK.', () => {
    expect(ADMIN_ANALYZE_OK).to.equal('ADMIN_ANALYZE_OK')
  })

  it('Should export a constant ADMIN_ANALYZE_ERROR.', () => {
    expect(ADMIN_ANALYZE_ERROR).to.equal('ADMIN_ANALYZE_ERROR')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(analyzing).to.be.a('function')
    })
    it('Should initialize "analyzing" with empty array', () => {
      let state = analyzing(undefined, {})
      expect(state).to.eql([])
    })
    it('Should return previous state of publish ids if an action was not matched', () => {
      let state = analyzing(undefined, {})
      expect(state).to.be.empty

      state = analyzing(state, analyzeLoading({ id: 1 }))
      expect(state).to.have.lengthOf(1)

      state = analyzing(state, { type : 'UNKNOWN' })
      expect(state).to.have.lengthOf(1)
    })
  })

  describe('(Action Creator) analyzeLoading', () => {
    it('Should be exported as a function.', () => {
      expect(analyzeLoading).to.be.a('function')
    })

    it('Should return an action with type "ADMIN_ANALYZE_LOADING".', () => {
      expect(analyzeLoading('123')).to.have.property('type', ADMIN_ANALYZE_LOADING)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(analyzeLoading('123')).to.have.property('payload').to.eql('123')
    })
  })

  describe('(Action Creator) analyzeOk', () => {
    it('Should be exported as a function.', () => {
      expect(analyzeOk).to.be.a('function')
    })

    it('Should return an action with type "ADMIN_ANALYZE_OK".', () => {
      expect(analyzeOk([{ id : 1 }])).to.have.property('type', ADMIN_ANALYZE_OK)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(analyzeOk([{ id : 1 }])).to.have.property('payload').to.eql([{ id : 1 }])
    })
  })

  describe('(Action Creator) analyzeError', () => {
    it('Should be exported as a function.', () => {
      expect(analyzeError).to.be.a('function')
    })

    it('Should return an action with type "ADMIN_ANALYZE_ERROR".', () => {
      expect(analyzeError('error')).to.have.property('type', ADMIN_ANALYZE_ERROR)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(analyzeError('error')).to.have.property('payload', 'error')
    })
  })

  describe('(Action Creator) analyzeSentiment', () => {
    it('Should be exported as a function.', () => {
      expect(analyzeSentiment).to.be.a('function')
    })
    it('should analyze reviews', () => {
      mockAxios.reset()
      mockAxios.onPut(`${baseURL}/reviews/123/analyze`).reply(200, [{ id: 1 }])
      const expectedActions = [
        {
          type: ADMIN_ANALYZE_LOADING,
          payload: true
        },
        {
          type: ADMIN_ANALYZE_OK,
          payload: [{ id: 1 }]
        }
      ]

      const store = mockStore({ emails : [] }, expectedActions)
      return store.dispatch(analyzeSentiment('123')).then(
        () => expect(store.getActions()).to.eql(expectedActions),
        error => console.log(error)
      )
    })
    it('should got error on analyze reviews', () => {
      mockAxios.reset()
      mockAxios.onPut(`${baseURL}/reviews/123/analyze`).reply(500, { error : 'error' })
      const expectedActions = [
        {
          type: ADMIN_ANALYZE_LOADING,
          payload: true
        },
        {
          type: ADMIN_ANALYZE_ERROR,
          payload: { code: 500, error : 'error' }
        }
      ]

      const store = mockStore({ emails : [] }, expectedActions)
      return store.dispatch(analyzeSentiment('123')).then(
        () => expect(store.getActions()).to.eql(expectedActions),
        error => console.log(error)
      )
    })
  })
})
