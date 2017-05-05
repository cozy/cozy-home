import React from 'react'
import { withRouter } from 'react-router'

const Dialog = ({ router, className, headerStyle, headerIcon, children }) => {
  const gotoParent = () => {
    let url = router.location.pathname
    router.push(url.substring(0, url.lastIndexOf('/')))
  }

  return (
    <div role='dialog' className={className}>
      <div role='separator' onClick={gotoParent} />
      <div className='wrapper'>
        <div role='contentinfo'>
          <header className='dialog-header' style={headerStyle}>
            {headerIcon &&
              <svg className='item-icon'>
                <use xlinkHref={headerIcon} />
              </svg>
            }
            <div className='close-button' role='close' onClick={gotoParent} />
          </header>
          <div className='dialog-content'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Dialog)
