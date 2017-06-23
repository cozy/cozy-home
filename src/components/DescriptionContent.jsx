import React from 'react'
import classNames from 'classnames'
import ReactMarkdownWrapper from '../components/ReactMarkdownWrapper'

export const DescriptionContent = ({ t, cssClassesObject, title, messages, children }) => {
  return (
    <div className={classNames(cssClassesObject)}>
      {title && <h4 className='col-account-description-title'>{title}</h4>}
      {messages && messages.length > 0 && messages.map(m => {
        return <p className='col-account-description-message'>
          <ReactMarkdownWrapper
            source={m}
          />
        </p>
      })}
      {children}
    </div>
  )
}

export default DescriptionContent
