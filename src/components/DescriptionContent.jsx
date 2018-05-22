import React from 'react'
import classNames from 'classnames'
import ReactMarkdownWrapper from '../components/ReactMarkdownWrapper'
import styles from '../styles/descriptionContent'

export const DescriptionContent = ({
  cssClassesObject,
  title,
  messages,
  children,
  hasError
}) => {
  return (
    <div className={classNames(cssClassesObject)}>
      {title && (
        <h4 className={styles['col-account-description-title']}>{title}</h4>
      )}
      {messages &&
        messages.length > 0 &&
        messages.map((m, i) => {
          return (
            <p
              key={i}
              className={classNames(
                styles['col-account-description-message'],
                hasError && 'errors'
              )}
            >
              <ReactMarkdownWrapper source={m} />
            </p>
          )
        })}
      {children}
    </div>
  )
}

export default DescriptionContent
