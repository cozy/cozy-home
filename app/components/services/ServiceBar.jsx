/** @jsx h */
import { h } from 'preact'

const ServiceBar = ({appEditor, appName, iconPath, onCancel}) => (
  <header className='coz-service-bar'>
    <span className='coz-icon'>
      <img src={iconPath} />
    </span>
    <h1>{`${appEditor && appEditor} ${appName}`}</h1>
    <span className='coz-btn coz-btn--close' role='close' onClick={() => onCancel()} />
  </header>
)

export default ServiceBar
