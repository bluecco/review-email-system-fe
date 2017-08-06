import { connect } from 'react-redux'
import {
  fetchEmails,
  getAdminMails,
  isLoadingSelector
} from '../modules/admin'

import Admin from '../components/Admin'

const mapDispatchToProps = {
  fetchEmails
}

const mapStateToProps = (state) => ({
  emails: getAdminMails(state),
  loading: isLoadingSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
