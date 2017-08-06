import React, { Component } from 'react'
import { Row, Column } from 'hedron'
import ReviewRow from './ReviewRow'

export class Reviews extends Component {

  componentWillMount () {
    const { fetchReviews } = this.props
    fetchReviews()
  }

  handlePageClick (isNext) {
    const { fetchReviews, pageable } = this.props
    fetchReviews(isNext ? pageable.number + 1 : pageable.number - 1)
  }

  render () {
    const { reviews, pageable } = this.props
    return (
      <div>
        <h1 style={{marginBottom : '40px'}}>Reviews</h1>

        {
          reviews.map(review =>
            <div
              key={review.messageId}
              style={{'border': 'solid 1px lightgrey', marginBottom : '40px'}}
            >
              <ReviewRow

                arrivalDate={review.arrivalDate}
                subject={review.subject}
                body={review.body}
                fromEmail={review.fromEmail}
                fromDisplayName={review.fromDisplayName}
              />
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

export default Reviews
