import { combineReducers } from 'redux'
import { baseURL } from '../../../common'
import { createSelector } from 'reselect'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const REVIEWS_LOADING = 'REVIEWS_LOADING'
export const REVIEWS_RETRIEVED = 'REVIEWS_RETRIEVED'
export const REVIEWS_RETRIEVED_PAGES = 'REVIEWS_RETRIEVED_PAGES'
export const REVIEWS_RETRIEVED_ERROR = 'REVIEWS_RETRIEVED_ERROR'

// ------------------------------------
// Actions Creators
// ------------------------------------
export function fetchReviewsLoading () {
  return { type : REVIEWS_LOADING, payload : true }
}

export function fetchReviewsOk (payload) {
  return dispatch => {
    dispatch({ type : REVIEWS_RETRIEVED, payload : payload.content })

    const {number, totalElements, totalPages, size, numberOfElements, first, last} = payload;
    dispatch({
      type : REVIEWS_RETRIEVED_PAGES,
      payload : { number, totalElements, totalPages, size, numberOfElements, first, last }
    })
  }
}

export function fetchReviewsError (payload) {
  return { type : REVIEWS_RETRIEVED_ERROR, payload }
}

// ------------------------------------
// Actions
// ------------------------------------
export const fetchReviews = (page = 0, size = 20) => {
  return (dispatch, getState) => {
    dispatch(fetchReviewsLoading())
    return axios.get(`${baseURL}/reviews/published?page=${page}&size=${size}`).then(
      response => dispatch(fetchReviewsOk(response.data)),
      error => {
        const { response } = error
        dispatch(fetchReviewsError({ code: response.status, error: response.data.error }))
      }
    )
  }
}

export const actions = {
  fetchReviews
}

// ------------------------------------
// Reducers
// ------------------------------------
export function loading (state = false, { type }) {
  switch (type) {
    case REVIEWS_LOADING:
      return true
    case REVIEWS_RETRIEVED:
    case REVIEWS_RETRIEVED_ERROR:
      return false
    default:
      return state
  }
}

export function pageable(state = {}, {type, payload}) {
  if(type === REVIEWS_RETRIEVED_PAGES) {
    return payload
  }
  return state;
}

export function list (state = [], { type, payload }) {
  switch (type) {
    case REVIEWS_RETRIEVED:
      return payload
    case REVIEWS_RETRIEVED_ERROR:
      return state
    default:
      return state
  }
}

export default combineReducers({
  loading,
  list,
  pageable
})

// ------------------------------------
// Selectors
// ------------------------------------
export const isLoading = state => state.reviews.loading
export const pageableSelector = state => state.reviews.pageable

const reviewsData = state => state.reviews.list
export const getAdminMails = createSelector(
  [reviewsData],
  reviewsData => reviewsData
)
