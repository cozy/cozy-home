import React from 'react'

const ServiceBar = ({ appEditor, appName, iconPath, onCancel, closeable }) => (
  <header className="coz-service-bar">
    <span className="coz-icon">
      <img src={iconPath} />
    </span>
    <h1>{`${appEditor && appEditor} ${appName}`}</h1>
    {closeable && (
      <span
        className="coz-btn coz-btn--close"
        role="close"
        onClick={() => onCancel()}
      />
    )}
  </header>
)

export default ServiceBar
