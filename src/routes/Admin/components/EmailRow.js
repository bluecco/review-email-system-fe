import React from 'react'
import PropTypes from 'prop-types'
import { Row, Column } from 'hedron'
import Moment from 'react-moment'

export const EmailRow = ({ arrivalDate, email, score, published, publishFn, analyzeFn, publishing, analyzing  }) => {

  const color = score < 70 ? 'Crimson' : 'LimeGreen'

  return (
  <Row style={{'background': color}}>

    <Column sm={3}>
      <Moment
        format="YYYY-MM-DD HH:mm"
        style={{'color' : 'white'}}
      >
        {arrivalDate}
      </Moment>
    </Column>

    <Column sm={3}>
      <span style={{'color' : 'white'}}>{email}</span>
    </Column>

    <Column sm={2}>
      <div style={{'position' : 'relative'}}>
        <span style={{'color' : 'white'}}>{score}</span>
        <button
          style={{'position': 'absolute', 'right': '0'}}
          type="button"
          className="btn btn-primary"
          onClick={analyzeFn}
          disabled={analyzing}
        >
          <i className="fa fa-refresh"></i>
        </button>
      </div>
    </Column>

    <Column sm={3}>
    <div>
      <select
        className="form-control"
        defaultValue={published.toString()}
        onChange={publishFn}
        disabled={publishing}
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
