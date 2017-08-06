import React from 'react'
import PropTypes from 'prop-types'
import { Row, Column } from 'hedron'
import Moment from 'react-moment'

const cellStyle = {
  color : 'white'
}

const renderSmile = score => {
  if (!score) {
    return ("")
  }

  const className = `fa ${score < 70 ? 'fa-frown-o' : 'fa-smile-o'}`

  return (
    <i
      style={{'position': 'absolute', 'left': '0', 'fontSize': '25px', color: 'white'}}
      className={className}
    />
  )

}

const renderAnalyze = score => {
  return !score ?
    <i className="fa fa-calculator" /> :
    <i className="fa fa-refresh" />
}

export const EmailRow = ({ arrivalDate, email, score, published, publishFn, analyzeFn, publishing, analyzing  }) => (
  <Row style={{'background': !score ? 'DarkGray' : score < 70 ? 'Crimson' : 'LimeGreen'}}>

    <Column sm={3}>
      <Moment
        format="YYYY-MM-DD HH:mm"
        style={cellStyle}
      >
        {arrivalDate}
      </Moment>
    </Column>

    <Column sm={3}>
      <span style={cellStyle}>{email}</span>
    </Column>

    <Column sm={2}>
      <div style={{'position' : 'relative'}}>
        {renderSmile(score)}
        <span style={cellStyle}>{score}</span>
        {!score && <span style={cellStyle}>-</span>}
        <button
          style={{'position': 'absolute', 'right': '0'}}
          type="button"
          className="btn btn-primary"
          onClick={analyzeFn}
          disabled={analyzing}
        >
          {renderAnalyze(score)}
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

EmailRow.propTypes = {
  arrivalDate      : PropTypes.number.isRequired,
  email            : PropTypes.string.isRequired,
  published        : PropTypes.bool.isRequired,
  publishFn        : PropTypes.func.isRequired,
  analyzeFn        : PropTypes.func.isRequired
}

export default EmailRow
