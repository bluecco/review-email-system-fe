import React from 'react'
import PropTypes from 'prop-types'
import { Row, Column } from 'hedron'
import Moment from 'react-moment'

export const ReviewRow = ({ arrivalDate, subject, body, fromEmail, fromDisplayName }) => (
  <Row>
    <Column sm={3}>
    <Moment date={arrivalDate}></Moment>
    </Column>
    <Column sm={3}>
      <span>{fromEmail}</span>
    </Column>
    <Column sm={3}>
      <span>{fromDisplayName}</span>
    </Column>
    <Column sm={3}>
      <span>{subject}</span>
    </Column>
    <Column sm={3}>
      <span>{body}</span>
    </Column>
  </Row>
)

ReviewRow.propTypes = {
  arrivalDate     : PropTypes.number.isRequired,
  fromEmail       : PropTypes.string.isRequired,
  subject         : PropTypes.string.isRequired,
  body            : PropTypes.string.isRequired,
}

export default ReviewRow
