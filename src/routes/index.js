import CoreLayout from '../layouts/PageLayout/PageLayout'
import ReviewsRoute from './Reviews'
import AdminRoute from './Admin'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/admin') },
  childRoutes : [
    AdminRoute(store),
    ReviewsRoute(store)
  ]
})

export default createRoutes
