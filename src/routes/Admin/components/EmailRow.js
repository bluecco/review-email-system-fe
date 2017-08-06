import React from 'react'
import PropTypes from 'prop-types'
import { Row, Column } from 'hedron'
import Moment from 'react-moment'

export const EmailRow = ({ arrivalDate, email, score, published, publishFn, analyzeFn }) => {

  return (
  <Row>
    <Column sm={3}>
      <Moment format="YYYY-MM-DD HH:mm">{arrivalDate}</Moment>
    </Column>
    <Column sm={3}>
      {email}
    </Column>
    <Column sm={3}>
    <div>
      {score}
      <button type="button" className="btn btn-primary" onClick={analyzeFn}>analyze</button>
      </div>
    </Column>
    <Column sm={3}>
    <div>
      <select
        className="form-control"
        defaultValue={published.toString()}
        onChange={publishFn}
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      </div>
    </Column>
  </Row>
)
}

EmailRow.propTypes = {
  arrivalDate      : PropTypes.number.isRequired,
  email            : PropTypes.string.isRequired,
  published        : PropTypes.bool.isRequired,
  publishFn        : PropTypes.func.isRequired,
  analyzeFn        : PropTypes.func.isRequired
}

export default EmailRow
