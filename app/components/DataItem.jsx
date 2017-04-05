/** @jsx h */
import { h } from 'preact'
import { translate } from '../plugins/preact-polyglot'

const DataItem = ({ t, dataType, hex }) => (
  <li class='account-data'>
    <svg class='account-dataIcon' style={{color: hex}}>
      <use xlinkHref={require('../assets/sprites/icon-' + dataType + '.svg')} />
    </svg>
    {t('dataType ' + dataType)}
  </li>
)

export default translate()(DataItem)
