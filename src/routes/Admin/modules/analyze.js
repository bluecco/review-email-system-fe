import { baseURL } from '../../../common'
import { remove } from 'lodash'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const ADMIN_ANALYZE_LOADING = 'ADMIN_ANALYZE_LOADING'
export const ADMIN_ANALYZE_OK = 'ADMIN_ANALYZE_OK'
export const ADMIN_ANALYZE_ERROR = 'ADMIN_ANALYZE_ERROR'

// ------------------------------------
// Actions Creators
// ------------------------------------
export function analyzeLoading (payload) {
  return { type : ADMIN_ANALYZE_LOADING, payload }
}

export function analyzeOk (payload) {
  debugger
  return { type : ADMIN_ANALYZE_OK, payload }
}

export function analyzeError (payload) {
  return { type : ADMIN_ANALYZE_ERROR, payload }
}

// ------------------------------------
// Actions
// ------------------------------------
export const analyzeSentiment = (id) => {
  return dispatch => {
    dispatch(analyzeLoading(id))
    return axios.put(`${baseURL}/reviews/${id}/analyze`).then(
      response => dispatch(analyzeOk(response.data)),
      error => {
        const { response } = error
        dispatch(analyzeError({ code: response.status, error: response.data.error }))
      }
    )
  }
}

export const actions = {
  analyzeSentiment
}

// ------------------------------------
// Reducers
// ------------------------------------

export function analyzing (state = [], { type, payload }) {
  switch (type) {
    case ADMIN_ANALYZE_LOADING:
      let analysisArray = state
      analysisArray.push(payload)
      return analysisArray
    case ADMIN_ANALYZE_OK: case ADMIN_ANALYZE_ERROR:
    debugger
      let array = state
      remove(array, item => item === payload.messageId)
      return array
    default:
      return state
  }
}

// ------------------------------------
// Selectors
// ------------------------------------
export const analyzingSelector = state => state.admin.analyzing
