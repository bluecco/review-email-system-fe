import { connect } from 'react-redux'
import {
  fetchReviews,
  getAdminMails,
  isLoading,
  pageableSelector
} from '../modules/reviews'

import Reviews from '../components/Reviews'

const mapDispatchToProps = {
  fetchReviews
}

const mapStateToProps = (state) => ({
  reviews: getAdminMails(state),
  loading: isLoading(state),
  pageable: pageableSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
