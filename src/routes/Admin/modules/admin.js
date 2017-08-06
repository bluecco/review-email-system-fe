import { combineReducers } from 'redux'
import { baseURL } from '../../../common'
import { createSelector } from 'reselect'
import { publishing, ADMIN_PUBLISH_OK, ADMIN_PUBLISH_ERROR } from './publishing'
import { analyzing, ADMIN_ANALYZE_OK, ADMIN_ANALYZE_ERROR } from './analyze'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const ADMIN_LOADING = 'ADMIN_LOADING'
export const ADMIN_EMAILS_RETRIEVED = 'ADMIN_EMAILS_RETRIEVED'
export const ADMIN_EMAILS_RETRIEVED_PAGES = 'ADMIN_EMAILS_RETRIEVED_PAGES'
export const ADMIN_EMAILS_RETRIEVED_ERROR = 'ADMIN_EMAILS_RETRIEVED_ERROR'

// ------------------------------------
// Actions Creators
// ------------------------------------
export function fetchEmailsLoading () {
  return { type : ADMIN_LOADING, payload : true }
}

export function fetchEmailsOk (payload) {
  return dispatch => {
    dispatch({ type : ADMIN_EMAILS_RETRIEVED, payload : payload.content })

    const {number, totalElements, totalPages, size, numberOfElements, first, last} = payload;
    dispatch({
      type : ADMIN_EMAILS_RETRIEVED_PAGES,
      payload : { number, totalElements, totalPages, size, numberOfElements, first, last }
    })
  }
}

export function fetchEmailsError (payload) {
  return { type : ADMIN_EMAILS_RETRIEVED_ERROR, payload }
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchEmails = (page = 0, size = 20) => {
  return dispatch => {
    dispatch(fetchEmailsLoading())
    // TODO: add page and size parameters
    return axios.get(`${baseURL}/reviews?page=${page}&size=${size}`).then(
      response => dispatch(fetchEmailsOk(response.data)),
      error => {
        const { response } = error
        dispatch(fetchEmailsError({ code: response.status, error: response.data.error }))
      }
    )
  }
}

export const actions = {
  fetchEmails
}

// ------------------------------------
// Reducers
// ------------------------------------
export function loading (state = false, { type }) {
  switch (type) {
    case ADMIN_LOADING:
      return true
    case ADMIN_EMAILS_RETRIEVED:
    case ADMIN_EMAILS_RETRIEVED_ERROR:
      return false
    default:
      return state
  }
}

export function pageable(state = {}, {type, payload}) {
  if(type === ADMIN_EMAILS_RETRIEVED_PAGES) {
    return payload
  }
  return state;
}

export function emails (state = [], { type, payload }) {
  switch (type) {
    case ADMIN_EMAILS_RETRIEVED:
      return payload
    case ADMIN_EMAILS_RETRIEVED_ERROR: case ADMIN_PUBLISH_ERROR: case ADMIN_ANALYZE_ERROR:
      return state
    case ADMIN_PUBLISH_OK:
      let mod = [].concat(state).map(current => current.messageId === payload.messageId ? { ...current, published: true } : current)
      return mod
    case ADMIN_ANALYZE_OK:
      let scored = [].concat(state).map(current => current.messageId === payload.messageId ? { ...current, score: payload.score } : current)
      return scored
    default:
      return state
  }
}

export default combineReducers({
  loading,
  emails,
  publishing,
  analyzing,
  pageable
})

// ------------------------------------
// Selectors
// ------------------------------------
export const isLoadingSelector = state => state.admin.loading
export const pageableSelector = state => state.admin.pageable

const emailsSelector = state => state.admin.emails
export const getAdminMails = createSelector(
  [emailsSelector],
  emailsSelector => emailsSelector
)
