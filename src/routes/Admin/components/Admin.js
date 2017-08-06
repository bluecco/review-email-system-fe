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
              arrivalDate={email.arrivalDate}
              email={email.email}
              score={email.score}
              published={email.published}
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
