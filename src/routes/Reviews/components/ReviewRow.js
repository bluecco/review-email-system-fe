import React from 'react'
import PropTypes from 'prop-types'
import { Row, Column } from 'hedron'
import Moment from 'react-moment'
import moment from 'moment'

export const ReviewRow = ({ arrivalDate, subject, body, fromEmail, fromDisplayName }) => (

  <div>
    <Row style={{'background' : 'SkyBlue'}}>
      <Column sm={9}>
        <span style={{'float' : 'left'}}>{fromDisplayName ? fromDisplayName : fromEmail}</span>
      </Column>
      <Column sm={3}>
        <div>Sent this on:</div>
        <Moment date={arrivalDate} format={'MM/DD/YYYY'}></Moment>
      </Column>
    </Row>
    <Row>
      <Column sm={12}>
        <span style={{'float' : 'left'}}>{subject}</span>
      </Column>
    </Row>
    <Row>
      <Column sm={12}>
        <span style={{'float' : 'left'}}>{body}</span>
      </Column>
    </Row>
  </div>
)

ReviewRow.propTypes = {
  arrivalDate     : PropTypes.number.isRequired,
  fromEmail       : PropTypes.string.isRequired,
  subject         : PropTypes.string.isRequired,
  body            : PropTypes.string.isRequired,
}

export default ReviewRow
