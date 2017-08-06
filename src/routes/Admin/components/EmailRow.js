import React from 'react'
import PropTypes from 'prop-types'
import { Row, Column } from 'hedron'

export const EmailRow = ({ arrivalDate, email, score, published, publishFn }) => (
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
    <Column sm={3}>
    <button onClick={publishFn}>publish</button>
    </Column>
  </Row>
)

EmailRow.propTypes = {
  arrivalDate      : PropTypes.string.isRequired,
  email            : PropTypes.string.isRequired,
  published        : PropTypes.bool.isRequired
}

export default EmailRow
