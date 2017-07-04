import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import UseCaseItem from './UseCaseItem'

const UseCaseList = ({ t, useCases, context }) => (
  <div className='use-cases-list'>
    {useCases.map(useCase =>
      <UseCaseItem
        useCase={useCase}
        context={context}
      />
    )}
  </div>
)

export default translate()(UseCaseList)
