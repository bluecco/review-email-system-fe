import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header, EmailRow } from './index'

export class Admin extends Component {
  componentWillMount () {
    const { fetchEmails } = this.props
    fetchEmails()
  }

  render () {
    const { emails } = this.props
    return (
      <div>
        <Header />
        {
          emails.map(email =>
            <EmailRow
              key={email.id}
              id={email.id}
              body={email.body}
              title={email.title}
              userId={email.userId}
            />
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
