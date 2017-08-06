import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header, EmailRow } from './index'

export class Admin extends Component {
  componentWillMount () {
    const { fetchEmails } = this.props
    fetchEmails()
  }

  handlePublishClick (id) {
    const { updatePublishStatus } = this.props
    updatePublishStatus(id)
  }

  handleAnalyzeClick (id) {
    debugger
    const { analyzeSentiment } = this.props
    analyzeSentiment(id)

  }

  render () {
    const { emails } = this.props
    console.log(emails[0])

    return (
      <div>
        <Header />
        {
          emails.map(email =>
            <div key={email.messageId}>
              <EmailRow
                arrivalDate={email.arrivalDate}
                email={email.fromEmail}
                score={email.score}
                published={email.published}
                analyzeFn={() => this.handleAnalyzeClick(email.messageId)}
                publishFn={() => this.handlePublishClick(email.messageId)}
              />
              <div style={{'border': 'solid 1px black'}}></div>
            </div>
          )
        }
      </div>
    )
  }
}

Admin.propTypes = {
  emails: PropTypes.array.isRequired,
  fetchEmails: PropTypes.func.isRequired
}

export default Admin
