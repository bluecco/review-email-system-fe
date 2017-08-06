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
            <div key={email.id}>
              <EmailRow
                key={email.id}
                arrivalDate={email.arrivalDate}
                email={email.fromEmail}
                score={email.score}
                published={email.published}
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
