import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'

import styles from './styles'

const Pending = translate()(props => (
  <span className={styles['item-pending']}>
    {props.t('Queue.item.pending')}
  </span>
))

class Item extends Component {
  state = {
    progress: 0
  }
  componentDidMount() {
    let elapsedTime = 0
    this.myInterval = setInterval(() => {
      elapsedTime += 10
      let progress = (Math.atan(elapsedTime / 3e3) / (Math.PI / 2)) * 90
      this.setState({
        progress: progress
      })
    }, 25)
  }
  componentDidUpdate = () => {
    // If the status of the konnector is not 'ongoing', we remove the progressBar
    const updatedStatus = this.props.status
    if (updatedStatus !== 'ongoing') {
      clearInterval(this.myInterval)
      this.progressBar.remove()
    }
  }
  render() {
    const { label, status, icon } = this.props
    const { progress } = this.state
    return (
      <div
        className={classNames(styles['queue-item'], {
          [styles['queue-item--done']]: status === 'done',
          [styles['queue-item--error']]: status === 'error'
        })}
      >
        <div className={classNames(styles['item-icon'])}>
          {icon && (
            <img className={classNames(styles['item-icon-img'])} src={icon} />
          )}
        </div>
        <div className={classNames(styles['item-label'])}>{label}</div>
        <div className={styles['item-status']}>
          {status === 'pending' ? (
            <Pending />
          ) : (
            <div className={styles[`item-${status}`]} />
          )}
        </div>
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          className={classNames(styles['queue-item-progress-bar'])}
          style={{ width: `${progress}%` }}
          ref={progressBar => (this.progressBar = progressBar)}
        />
      </div>
    )
  }
}

class Queue extends Component {
  state = {
    collapsed: false
  }

  toggleCollapsed = () => {
    this.setState(state => ({ collapsed: !state.collapsed }))
  }

  render() {
    const { t, visible = false, queue = [], purgeQueue } = this.props
    const { collapsed } = this.state
    const doneCount = queue.filter(
      connection => connection.status !== 'ongoing'
    ).length
    const successCount = queue.filter(
      connection => connection.status === 'done'
    ).length
    return (
      <div
        className={classNames(styles['queue'], {
          [styles['queue--visible']]: visible,
          [styles['queue--collapsed']]: collapsed
        })}
      >
        <h4
          className={styles['queue-header']}
          onDoubleClick={this.toggleCollapsed}
        >
          {doneCount < queue.length && (
            <div className={styles['queue-header-inner']}>
              <span className="coz-desktop">{t('Queue.header')}</span>
              <span className="coz-mobile">
                {t('Queue.header_mobile', {
                  done: doneCount,
                  total: queue.length
                })}
              </span>
            </div>
          )}
          {doneCount >= queue.length && (
            <div className={styles['queue-header-inner']}>
              <span>
                {t('Queue.header_done', {
                  done: successCount,
                  total: queue.length
                })}
              </span>
              <button
                className={classNames(styles['btn-close'])}
                onClick={purgeQueue}
              >
                {t('Queue.close')}
              </button>
            </div>
          )}
        </h4>
        <progress
          className={styles['queue-progress']}
          value={doneCount}
          max={queue.length}
        />
        <div className={styles['queue-content']}>
          <div className={styles['queue-list']}>
            {queue.map((item, index) => (
              <Item
                key={index}
                label={item.label}
                status={item.status}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default translate()(Queue)
