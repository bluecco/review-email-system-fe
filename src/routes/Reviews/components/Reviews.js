import React, { Component } from 'react'

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
      </div>
    )
  }
}

export default Reviews
