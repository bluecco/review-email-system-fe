import { injectReducer } from '../../store/reducers'

// Sync route definition
export default (store) => ({
  path : 'reviews',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      // const Reviews = require('./containers/AdminContainer').default
      const Reviews = require('./components/Reviews').default
      // const reducer = require('./modules/admin').default

      // injectReducer(store, { key: 'reviews', reducer })

      /*  Return getComponent   */
      cb(null, Reviews)

      /* Webpack named bundle   */
    }, 'reviews')
  }
})
