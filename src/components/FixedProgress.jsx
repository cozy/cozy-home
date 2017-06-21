import React, { Component } from 'react'
import '../styles/fixedProgress'

export default class Notification extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      progress: 0.000001,
      id: null
    }
  }
  componentDidMount () {
    const {interval} = this.props
    const id = window.setInterval(() => {
      this.setState({
        progress: this.state.progress + parseInt(interval, 10)
      })
    }, interval)
    this.setState({
      idInterval: id
    })
  }

  componentWillUnmount () {
    window.clearInterval(this.state.idInterval)
  }

  render () {
    const { duration } = this.props
    const { progress } = this.state
    console.log(progress, 'progress')

    return <progress defaultValue={progress} max={duration} />
  }
}
