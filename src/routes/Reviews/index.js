import { injectReducer } from '../../store/reducers'

// Sync route definition
export default (store) => ({
  path : 'reviews',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      // const Reviews = require('./containers/AdminContainer').default
      const Reviews = require('./containers/ReviewsContainer').default
      const reducer = require('./modules/reviews').default

      injectReducer(store, { key: 'reviews', reducer })

      /*  Return getComponent   */
      cb(null, Reviews)

      /* Webpack named bundle   */
    }, 'reviews')
  }
})
