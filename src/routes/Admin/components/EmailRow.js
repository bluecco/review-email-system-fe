import React from 'react'
import PropTypes from 'prop-types'
import { Row, Column } from 'hedron'

export const EmailRow = ({ arrivalDate, email, score, published }) => (
  <Row>
    <Column sm={3}>
      {arrivalDate}
    </Column>
    <Column sm={3}>
      {email}
    </Column>
    <Column sm={3}>
      {score}
    </Column>
    <Column sm={3}>
      {published}
    </Column>
  </Row>
)

EmailRow.propTypes = {
  arrivalDate      : PropTypes.string.isRequired,
  email            : PropTypes.string.isRequired,
  score            : PropTypes.number.isRequired,
  published        : PropTypes.bool.isRequired
}

export default EmailRow
