/** @jsx h */
import { h } from 'preact'
import { translate } from '../plugins/preact-polyglot'

import ConnectorList from './ConnectorList'
import Dialog from './Dialog'

// Fallback to get the item background image and avoid error if not found
const getItemBackground = (item, context) => {
  let background = 'rgb(0, 130, 230)'
  if (item.figure && context) {
    try {
      let img = require(`../contexts/${context}/assets/img/${item.figure}`)
      background = `center/100% url(${img})`
    } catch (e) {
      background = 'rgb(0, 130, 230)'
    }
  }
  return background
}

const UseCaseDialog = ({ t, item, connectors, context }) => (
  <Dialog
    className='use-case-dialog'
    headerStyle={{background: getItemBackground(item, context)}}
  >
    <h3>{t(`use-case ${item.slug} title`)}</h3>
    <p>{t(`use-case ${item.slug} description`)}</p>
    <ConnectorList connectors={connectors} />
  </Dialog>
)

export default translate()(UseCaseDialog)
