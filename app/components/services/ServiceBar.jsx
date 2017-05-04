/** @jsx h */
import { h } from 'preact'

const ServiceBar = ({appEditor, appName, iconPath, onCancel}) => (
  <header class='coz-service-bar'>
    <span class='coz-icon'>
      <img src={iconPath} />
    </span>
    <h1>{`${appEditor && appEditor} ${appName}`}</h1>
    <span class='coz-btn coz-btn--close' role='close' onClick={() => onCancel()} />
  </header>
)

export default ServiceBar
