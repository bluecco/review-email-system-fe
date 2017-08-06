import { baseURL } from '../../../common'
import { remove } from 'lodash'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const ADMIN_PUBLISH_LOADING = 'ADMIN_PUBLISH_LOADING'
export const ADMIN_PUBLISH_OK = 'ADMIN_PUBLISH_OK'
export const ADMIN_PUBLISH_ERROR = 'ADMIN_PUBLISH_ERROR'

// ------------------------------------
// Actions Creators
// ------------------------------------
export function publishLoading (payload) {
  return { type : ADMIN_PUBLISH_LOADING, payload }
}

export function publishOk (payload) {
  return { type : ADMIN_PUBLISH_OK, payload }
}

export function publishError (payload) {
  return { type : ADMIN_PUBLISH_ERROR, payload }
}

// ------------------------------------
// Actions
// ------------------------------------
export const updatePublishStatus = (id) => {
  return dispatch => {
    dispatch(publishLoading(id))
    return axios.put(`${baseURL}/reviews/${id}/publish`).then(
      response => dispatch(publishOk(response.data)),
      error => {
        const { response } = error
        dispatch(publishError({ code: response.status, error: response.data.error }))
      }
    )
  }
}

export const actions = {
  updatePublishStatus
}

// ------------------------------------
// Reducers
// ------------------------------------

export function publishing (state = [], { type, payload }) {
  switch (type) {
    case ADMIN_PUBLISH_LOADING:
      let publishingArray = state
      publishingArray.push(payload)
      return publishingArray
    case ADMIN_PUBLISH_OK: case ADMIN_PUBLISH_ERROR:
      let array = [].concat(state)
      remove(array, item => item === payload.messageId)
      return array
    default:
      return state
  }
}

// ------------------------------------
// Selectors
// ------------------------------------
export const isPublishingSelector = state => state.admin.publishing
