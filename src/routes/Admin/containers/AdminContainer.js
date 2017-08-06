import { connect } from 'react-redux'
import {
  fetchEmails,
  getAdminMails,
  isLoadingSelector
} from '../modules/admin'
import { updatePublishStatus } from '../modules/publishing'
import { analyzeSentiment } from '../modules/analyze'

import Admin from '../components/Admin'

const mapDispatchToProps = {
  fetchEmails,
  updatePublishStatus,
  analyzeSentiment
}

const mapStateToProps = (state) => ({
  emails: getAdminMails(state),
  loading: isLoadingSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
