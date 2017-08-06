import React from 'react'
import PropTypes from 'prop-types'
import { Row, Column } from 'hedron'

export const ReviewRow = ({ arrivalDate, subject, body, fromEmail, fromDisplayName }) => (
  <Row>
    <Column sm={3}>
      {arrivalDate}
    </Column>
    <Column sm={3}>
      {fromEmail}
    </Column>
    <Column sm={3}>
      {fromDisplayName}
    </Column>
    <Column sm={3}>
      {subject}
    </Column>
    <Column sm={3}>
      {body}
    </Column>
  </Row>
)

ReviewRow.propTypes = {
  arrivalDate     : PropTypes.string.isRequired,
  fromEamil       : PropTypes.string.isRequired,
  fromDisplayName : PropTypes.string.isRequired,
  subject         : PropTypes.string.isRequired,
  body            : PropTypes.string.isRequired,
}

export default ReviewRow
