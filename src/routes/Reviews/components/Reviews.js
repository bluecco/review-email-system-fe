import React, { Component } from 'react'
import ReviewRow from './ReviewRow'

export class Reviews extends Component {

  componentWillMount () {
    const { fetchReviews } = this.props
    fetchReviews()
  }

  render () {
    const { reviews } = this.props
    return (
      <div>
        <h1>Reviews</h1>

        {
          reviews.map(review =>
            <div key={review.messageId}>
              <ReviewRow
                arrivalDate={review.arrivalDate}
                subject={review.subject}
                body={review.body}
                fromEmail={review.fromEmail}
                fromDisplayName={review.fromDisplayName}
              />
              <div style={{'border': 'solid 1px black'}}></div>
            </div>
          )
        }

      </div>
    )
  }
}

export default Reviews
