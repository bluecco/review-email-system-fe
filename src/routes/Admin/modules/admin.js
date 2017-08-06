import { combineReducers } from 'redux'
import { baseURL } from '../../../common'
import { createSelector } from 'reselect'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const ADMIN_LOADING = 'ADMIN_LOADING'
export const ADMIN_EMAILS_RETRIEVED = 'ADMIN_EMAILS_RETRIEVED'
export const ADMIN_EMAILS_RETRIEVED_ERROR = 'ADMIN_EMAILS_RETRIEVED_ERROR'

// ------------------------------------
// Actions Creators
// ------------------------------------
export function fetchEmailsLoading () {
  return { type : ADMIN_LOADING, payload : true }
}

export function fetchEmailsOk (payload) {
  return { type : ADMIN_EMAILS_RETRIEVED, payload }
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
    return axios.get(`${baseURL}/posts?page=${page}&size=${size}`).then(
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

export function emails (state = [], { type, payload }) {
  switch (type) {
    case ADMIN_EMAILS_RETRIEVED:
      return payload
    case ADMIN_EMAILS_RETRIEVED_ERROR:
      return state
    default:
      return state
  }
}

export default combineReducers({
  loading,
  emails
})

// ------------------------------------
// Selectors
// ------------------------------------
export const isLoadingSelector = state => state.admin.loading

const emailsSelector = state => state.admin.emails
export const getAdminMails = createSelector(
  [emailsSelector],
  emailsSelector => emailsSelector
)