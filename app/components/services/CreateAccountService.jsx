/** @jsx h */
import { h } from 'preact'

const CreateAccountService = ({t, konnector, onCancel, onTerminate}) => (
  <div class='coz-service-content'>
    <h1>{konnector.name}</h1>
    <div>
      <button
        class='coz-btn coz-btn--secondary'
        onClick={() => onCancel()}>
        {t('intent.service.cancel')}
      </button>
      <button
        class='coz-btn cozy-btn--highlight'
        onClick={() => onTerminate()}>
        {t('intent.service.terminate')}
      </button>
    </div>
  </div>
)

export default CreateAccountService
