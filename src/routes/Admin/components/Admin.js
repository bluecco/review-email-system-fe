import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Column } from 'hedron'
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
    const { analyzeSentiment } = this.props
    analyzeSentiment(id)
  }

  handlePageClick (isNext) {
    const { fetchEmails, pageable } = this.props
    fetchEmails(isNext ? pageable.number + 1 : pageable.number - 1)
  }

  render () {
    const { emails, publishing, analyzing, pageable } = this.props

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
                publishing={publishing.includes(email.messageId)}
                analyzing={analyzing.includes(email.messageId)}
              />
              <div style={{'border': 'solid 1px black'}}></div>
            </div>
          )
        }

        <Row>
          <Column sm={12}>
            {pageable.totalPages > 1 &&
              <button
                type="button"
                disabled={pageable.first}
                className="btn btn-secondary"
                onClick={() => this.handlePageClick(false)}
              ><i className="fa fa-backward"></i></button>
            }
            {pageable.totalPages > 1 &&
              <button
                type="button"
                disabled={pageable.last}
                className="btn btn-secondary"
                onClick={() => this.handlePageClick(true)}
              ><i className="fa fa-forward"></i></button>
            }
          </Column>
        </Row>

      </div>
    )
  }
}

Admin.propTypes = {
  emails: PropTypes.array.isRequired,
  fetchEmails: PropTypes.func.isRequired
}

export default Admin
