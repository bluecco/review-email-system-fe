import {
  ADMIN_PUBLISH_LOADING,
  ADMIN_PUBLISH_OK,
  ADMIN_PUBLISH_ERROR,
  updatePublishStatus,
  publishLoading,
  publishOk,
  publishError,
  publishing
} from 'routes/Admin/modules/publishing'
import { baseURL } from 'common'

import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const mockAxios = new MockAdapter(axios)
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('(Redux Module) Publish', () => {
  it('Should export a constant ADMIN_PUBLISH_LOADING.', () => {
    expect(ADMIN_PUBLISH_LOADING).to.equal('ADMIN_PUBLISH_LOADING')
  })

  it('Should export a constant ADMIN_PUBLISH_OK.', () => {
    expect(ADMIN_PUBLISH_OK).to.equal('ADMIN_PUBLISH_OK')
  })

  it('Should export a constant ADMIN_PUBLISH_ERROR.', () => {
    expect(ADMIN_PUBLISH_ERROR).to.equal('ADMIN_PUBLISH_ERROR')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(publishing).to.be.a('function')
    })
    it('Should initialize "publishing" with empty array', () => {
      let state = publishing(undefined, {})
      expect(state).to.eql([])
    })
    it('Should return previous state of publish ids if an action was not matched', () => {
      let state = publishing(undefined, {})
      expect(state).to.be.empty

      state = publishing(state, publishOk({ id: 1 }))
      expect(state).to.have.lengthOf(1)

      state = publishing(state, { type : 'UNKNOWN' })
      expect(state).to.have.lengthOf(1)
    })
  })

  describe('(Action Creator) publishLoading', () => {
    it('Should be exported as a function.', () => {
      expect(publishLoading).to.be.a('function')
    })

    it('Should return an action with type "ADMIN_PUBLISH_LOADING".', () => {
      expect(publishLoading('123')).to.have.property('type', ADMIN_PUBLISH_LOADING)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(publishLoading('123')).to.have.property('payload').to.eql('123')
    })
  })

  describe('(Action Creator) publishOk', () => {
    it('Should be exported as a function.', () => {
      expect(publishOk).to.be.a('function')
    })

    it('Should return an action with type "ADMIN_PUBLISH_OK".', () => {
      expect(publishOk([{ id : 1 }])).to.have.property('type', ADMIN_PUBLISH_OK)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(publishOk([{ id : 1 }])).to.have.property('payload').to.eql([{ id : 1 }])
    })
  })

  describe('(Action Creator) publishError', () => {
    it('Should be exported as a function.', () => {
      expect(publishError).to.be.a('function')
    })

    it('Should return an action with type "ADMIN_PUBLISH_ERROR".', () => {
      expect(publishError('error')).to.have.property('type', ADMIN_PUBLISH_ERROR)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(publishError('error')).to.have.property('payload', 'error')
    })
  })

  describe('(Action Creator) updatePublishStatus', () => {
    it('Should be exported as a function.', () => {
      expect(updatePublishStatus).to.be.a('function')
    })
    it('should retrieve emails', () => {
      mockAxios.reset()
      mockAxios.onGet(`${baseURL}/reviews/123/publish`).reply(200, [{ id: 1 }])
      const expectedActions = [
        {
          type: ADMIN_PUBLISH_LOADING,
          payload: true
        },
        {
          type: ADMIN_PUBLISH_OK,
          payload: [{ id: 1 }]
        }
      ]

      const store = mockStore({ emails : [] }, expectedActions)
      return store.dispatch(updatePublishStatus('123')).then(
        () => expect(store.getActions()).to.eql(expectedActions),
        error => console.log(error)
      )
    })
    it('should got error on retrieve emails', () => {
      mockAxios.reset()
      mockAxios.onGet(`${baseURL}/reviews/123/publish`).reply(500, { error : 'error' })
      const expectedActions = [
        {
          type: ADMIN_PUBLISH_LOADING,
          payload: true
        },
        {
          type: ADMIN_PUBLISH_ERROR,
          payload: { code: 500, error : 'error' }
        }
      ]

      const store = mockStore({ emails : [] }, expectedActions)
      return store.dispatch(updatePublishStatus('123')).then(
        () => expect(store.getActions()).to.eql(expectedActions),
        error => console.log(error)
      )
    })
  })
})
