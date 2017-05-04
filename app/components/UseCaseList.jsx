/** @jsx h */
import { h } from 'preact'
import { translate } from '../plugins/preact-polyglot'
import UseCaseItem from './ConnectorItem'

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

const UseCaseList = ({ t, useCases, context }) => (
  <div class='use-cases-list'>
    {useCases.map(u =>
      <UseCaseItem
        title={t(`use-case ${u.slug} title`)}
        slug={u.slug}
        enableDefaultIcon={false}
        backgroundCSS={getItemBackground(u, context)}
        isUseCase
      />
    )}
  </div>
)

export default translate()(UseCaseList)
