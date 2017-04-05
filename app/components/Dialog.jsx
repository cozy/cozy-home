/** @jsx h */
import { h } from 'preact'
import { withRouter } from 'react-router'

const Dialog = ({ router, className, headerStyle, headerIcon, children }) => {
  const gotoParent = () => {
    let url = router.location.pathname
    router.push(url.substring(0, url.lastIndexOf('/')))
  }

  return (
    <div role='dialog' class={className}>
      <div role='separator' onClick={gotoParent} />
      <div class='wrapper'>
        <div role='contentinfo'>
          <header class='dialog-header' style={headerStyle}>
            {headerIcon &&
              <svg class='item-icon'>
                <use xlinkHref={headerIcon} />
              </svg>
            }
            <div class='close-button' role='close' onClick={gotoParent} />
          </header>
          <div class='dialog-content'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Dialog)
