import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { withClient } from 'cozy-client'

import CandidateServiceTile from 'components/CandidateServiceTile'
import CandidateCategoryTile from 'components/CandidateCategoryTile'
import AddServiceTile from 'components/AddServiceTile'

const NoServicesList = ({ t }) => (
  <div className="services-list">
    <CandidateServiceTile slug="ameli" label="Ameli" />
    <CandidateServiceTile slug="impots" label="impots" />
    <CandidateCategoryTile
      slugs={['hsbc119', 'caissedepargne1', 'ing', 'cic45']}
      label="banques"
    />
    <CandidateCategoryTile
      slugs={['sfr', 'free', 'orange', 'bouygues']}
      label="internet"
    />
    <AddServiceTile label={t('add_service')} />
  </div>
)

export default translate()(withClient(NoServicesList))
