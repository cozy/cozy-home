import React, { Component } from 'react'
import '../styles/fixedProgress'

const INTERVAL = 100

export default class Notification extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      progress: 0.000001,
      id: null
    }
  }
  componentDidMount () {
    const { duration } = this.props
    const idInterval = setInterval(() => {
      const progress = this.state.progress + parseInt(INTERVAL, 10)
      if (progress >= duration) clearInterval(idInterval)
      this.setState({
        progress: progress + parseInt(INTERVAL, 10)
      })
    }, INTERVAL)

    this.setState({
      idInterval: idInterval
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.idInterval)
  }

  render () {
    const { duration } = this.props
    const { progress } = this.state

    return <progress defaultValue={progress} max={duration} />
  }
}
