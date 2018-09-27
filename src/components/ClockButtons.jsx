import React, { Component } from 'react'
import play from '../assets/img/play.svg'
import stop from '../assets/img/stop.svg'
import reset from '../assets/img/reset.svg'
import settings from '../assets/img/settings.svg'
import Modal from '../UI/Modal'
import Settings from './Settings'

export class ClockButtons extends Component {
  state = {
    showSettings: false,
    showPlayButton: true
  }

  onPlayClick = () => {
    const showPlayButton = this.state.showPlayButton
    this.setState({ showPlayButton: !showPlayButton })
    this.props.playButton()
  }

  handleReset = () => {
    this.setState({ showPlayButton: true })
    this.props.resButton()
  }

  handleBreakValue = value => {
    this.props.handleSettingsChange(value, 'break')
  }

  handleSessionValue = async value => {
    await this.props.handleSettingsChange(value, 'session')
  }

  handleCloseSettings = () => {
    console.log(this.state.showSettings)
    this.setState({ showSettings: false })
  }

  handleSettingsButton = () => {
    this.setState({ showSettings: !this.state.showSettings })
    console.log(this.state.showSettings)
  }

  render() {
    const playButtonStyle = this.state.showPlayButton ? `play` : `stop`
    return (
      <div className="clock-pane">
        <div className="clock-pane__buttonFrame">
          <img src={reset} alt="reset" onClick={this.handleReset} />
        </div>

        <div className="clock-pane__buttonFrame clock-pane__buttonFrame--big">
          <img
            src={this.state.showPlayButton ? play : stop}
            alt="play/pause"
            onClick={this.onPlayClick}
          />
        </div>
        {/* {this.state.showSettings && ( */}
        <Modal
          onClose={this.handleCloseSettings}
          isShow={this.state.showSettings}
        >
          <Settings
            workTime={this.props.workTime}
            breakTime={this.props.breakTime}
            onClose={this.handleCloseSettings}
            breakChange={this.handleBreakValue}
            sessionChange={this.handleSessionValue}
          />
        </Modal>
        {/* )} */}
        <div
          className="clock-pane__buttonFrame"
          onClick={this.handleSettingsButton}
        >
          <img className="clock-pane__go__img" src={settings} alt="options" />
        </div>
      </div>
    )
  }
}

export default ClockButtons
