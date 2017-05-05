import React, { Component } from 'react'

const createStore = () => {
  let notifications = []
  let listeners = []

  const dispatch = (notification) => {
    notification.id = notifications.length
    notifications.push(notification)
    listeners.forEach(listener => listener(notification))
  }

  const subscribe = (listener) => {
    listeners.push(listener)
  }

  return { dispatch, subscribe }
}

const store = createStore()

class Notification extends Component {
  componentDidMount () {
    this.close = this.close.bind(this)
    this.closeTimer = setTimeout(() => {
      this.beginClosing()
    }, 2000)
  }

  componentWillUnmount () {
    this.base.removeEventListener('transitionend', this.close, false)
    this.base.classList.remove('coz-notification--closing')
    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
    }
  }

  beginClosing () {
    this.base.addEventListener('transitionend', this.close, false)
    this.base.classList.add('coz-notification--closing')
  }

  close () {
    this.props.onClose()
  }

  render () {
    const { message, details, type } = this.props
    return (
      <div className={['coz-notification', 'coz-notification--' + type].join(' ')}>
        <div className='coz-notification-title'>{message}</div>
        <div className='coz-notification-details'>{details}</div>
      </div>
    )
  }
}

export default class Notifier extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      notifications: []
    }
  }

  static info (msg, details) {
    store.dispatch({ type: 'info', msg, details })
  }

  static warning (msg) {
    store.dispatch({ type: 'warning', msg })
  }

  static error (msg) {
    store.dispatch({ type: 'error', msg })
  }

  componentDidMount () {
    store.subscribe(this.notify.bind(this))
  }

  notify (notification) {
    this.setState({
      notifications: [...this.state.notifications, notification]
    })
  }

  handleClose (id) {
    let idx = this.state.notifications.findIndex(n => n.id === id)
    this.setState({
      notifications: [
        ...this.state.notifications.slice(0, idx),
        ...this.state.notifications.slice(idx + 1)
      ]
    })
  }

  render () {
    return (
      <div className='coz-notifier'>
        {this.state.notifications.map(notif => (
          <Notification
            type={notif.type}
            message={notif.msg}
            details={notif.details}
            onClose={this.handleClose.bind(this, notif.id)}
          />
        ))}
      </div>
    )
  }
}
