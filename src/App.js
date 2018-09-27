import React, { Fragment, Component } from 'react'
import './styles/css/index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Showtime from './components/Showtime'
import ClockButtons from './components/ClockButtons'
import Analog from './assets/audio/analog.mp3'
import TempleBell from './assets/audio/temple-bell.mp3'

class App extends Component {
  state = {
    breaklength: 5,
    workTime: 25,
    timeInSeconds: 25 * 60, // default hard-coded :)
    isPaused: true,
    isBreak: false
  }

  handleSettingsChange = async (value, type) => {
    if (type === 'break') {
      await this.setState({ breaklength: value })
    }
    if (type === 'session') {
      await this.setState({ workTime: value, timeInSeconds: value * 60 })
    }
  }

  handleReset = () => {
    this.setState({
      isBreak: false,
      isPaused: true,
      timeInSeconds: this.state.workTime * 60
    })
    clearInterval(this.timer)
  }

  playAlarm = () => {
    const { isBreak } = this.state
    const alarmSrc = isBreak ? Analog : TempleBell
    this.audio = new Audio(alarmSrc)
    this.audio.play()
    setTimeout(() => {
      this.audio.pause()
    }, 3000)
  }

  handlePlayButton = () => {
    clearInterval(this.timer)
    const isPaused = this.state.isPaused
    this.setState({ isPaused: !isPaused })
    if (isPaused) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  countDown = async () => {
    const { isBreak, workTime, breaklength } = this.state
    let seconds = this.state.timeInSeconds
    seconds--
    if (seconds <= 0) {
      clearInterval(this.timer)
      this.playAlarm()
      const newTimes = (isBreak ? workTime : breaklength) * 60
      await this.setState({
        timeInSeconds: newTimes,
        isBreak: !isBreak
      })
      this.timer = setInterval(this.countDown, 1000)
    } else {
      this.setState({ timeInSeconds: seconds })
    }
  }

  render() {
    let totSeconds = this.state.timeInSeconds % 60
    let secDisp = totSeconds < 10 ? `0${totSeconds}` : totSeconds
    let minDisp = ~~(this.state.timeInSeconds / 60)
    let sessionStatus = this.state.isBreak ? 'Break' : 'Session'
    return (
      <div className="main-wrapper">
        <Header />
        <h2 className="session-status">{sessionStatus}</h2>
        <Showtime minutes={minDisp} seconds={secDisp} />
        <ClockButtons
          breakTime={this.state.breaklength}
          workTime={this.state.workTime}
          handleSettingsChange={this.handleSettingsChange}
          playButton={this.handlePlayButton}
          resButton={this.handleReset}
        />
        <Footer />
      </div>
    )
  }
}

export default App
