import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { withClient } from 'cozy-client'

import CandidateServiceTile from 'components/CandidateServiceTile'
import CandidateCategoryTile from 'components/CandidateCategoryTile'
import AddServiceTile from 'components/AddServiceTile'
import candidatesConfig from 'config/candidates'

const NoServicesList = ({ t }) => (
  <div className="services-list">
    {candidatesConfig.konnectors.map(({ slug, name }) => (
      <CandidateServiceTile key={slug} slug={slug} name={name} />
    ))}
    {Object.entries(candidatesConfig.categories).map(([category, slugs]) => (
      <CandidateCategoryTile key={category} slugs={slugs} label={category} />
    ))}
    <AddServiceTile label={t('add_service')} />
  </div>
)

export default translate()(withClient(NoServicesList))
