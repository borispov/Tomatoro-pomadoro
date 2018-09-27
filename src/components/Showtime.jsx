import React from 'react'

export default props => {
  return (
    <div className="current">
      <div className="current__minutes">{props.minutes}</div>
      <div className="colon">:</div>
      <div className="seconds">{props.seconds}</div>
    </div>
  )
}
