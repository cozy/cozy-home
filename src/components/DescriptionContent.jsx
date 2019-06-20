import React from 'react'
import classNames from 'classnames'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import styles from 'styles/descriptionContent'

export const DescriptionContent = ({
  cssClassesObject,
  title,
  messages,
  children,
  hasError,
  centerTitle
}) => {
  return (
    <div className={classNames(cssClassesObject)}>
      {title && (
        <h4
          className={
            centerTitle
              ? styles['col-account-description-title-centered']
              : styles['col-account-description-title']
          }
        >
          {title}
        </h4>
      )}
      {messages &&
        messages.length > 0 &&
        messages.map((m, i) => {
          return m ? (
            <div
              key={i}
              className={classNames(
                styles['col-account-description-message'],
                hasError && 'errors'
              )}
            >
              <ReactMarkdownWrapper source={m} />
            </div>
          ) : null
        })}
      {children}
    </div>
  )
}

export default DescriptionContent
