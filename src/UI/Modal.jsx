import React, { Fragment, Component } from 'react'
import ReactDOM from 'react-dom'

export class Modal extends Component {
  el = document.getElementById('modal-root')

  render() {
    return ReactDOM.createPortal(
      <Fragment>
        {this.props.isShow ? (
          <Fragment>
            <div className="Modal__overlay" onClick={this.props.onClose} />
            <div className={this.props.isShow ? 'Modal -in' : 'Modal -out'}>
              {this.props.children}
            </div>
          </Fragment>
        ) : null}
      </Fragment>,
      this.el
    )
  }
}

export default Modal
