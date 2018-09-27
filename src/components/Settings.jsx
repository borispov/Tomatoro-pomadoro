import React from 'react'

export default props => {
  let breakInput = React.createRef()
  let sessInput = React.createRef()

  const handleSessionValue = e => {
    if (!isNaN(Number(e.target.value))) {
      props.sessionChange(e.target.value)
    }
  }
  const handleBreakValue = e => {
    if (!isNaN(Number(e.target.value))) {
      props.breakChange(e.target.value)
    }
  }

  const increaseBreak = () => {
    breakInput.current.value++
    let newVal = breakInput.current.value
    props.breakChange(newVal)
  }
  const decreaseBreak = () => {
    breakInput.current.value--
    let newVal = breakInput.current.value
    props.breakChange(newVal)
  }
  const increaseSession = () => {
    sessInput.current.value++
    let newVal = sessInput.current.value
    props.sessionChange(newVal)
  }
  const decreaseSession = async () => {
    sessInput.current.value--
    let newVal = sessInput.current.value
    props.sessionChange(newVal)
  }

  return (
    <div className="settings">
      <i className="far fa-window-close fa-2x" onClick={props.onClose} />
      <h3>Settings Panel</h3>

      <div className="settings__columns">
        <div className="settings__break">
          <span>Break Length</span>
          <div className="break--row">
            <button onClick={decreaseBreak}> - </button>
            <input
              ref={breakInput}
              type="text"
              defaultValue={props.breakTime}
              onChange={e => handleBreakValue(e)}
            />
            <button onClick={increaseBreak}> + </button>
          </div>
        </div>
        <hr />
        <div className="settings__session">
          <span>Session Length</span>
          <div className="session--row">
            <button onClick={decreaseSession}> - </button>
            <input
              ref={sessInput}
              type="text"
              defaultValue={props.workTime}
              onChange={handleSessionValue}
            />
            <button onClick={increaseSession}> + </button>
          </div>
        </div>
      </div>
      <button className="close" onClick={props.onClose}>
        Close
      </button>
    </div>
  )
}
