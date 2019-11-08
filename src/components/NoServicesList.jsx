import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Title, Text } from 'cozy-ui/react/Text'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'

import CandidateServiceTile from 'components/CandidateServiceTile'
import CandidateCategoryTile from 'components/CandidateCategoryTile'
import AddServiceTile from 'components/AddServiceTile'
import candidatesConfig from 'config/candidates'
import ArrowIllustration from 'assets/images/drawing-arrow-up.svg'

export const NoServicesList = ({ t }) => (
  <>
    <div className="services-list">
      {candidatesConfig.konnectors.map(({ slug, name }) => (
        <CandidateServiceTile key={slug} slug={slug} name={name} />
      ))}
      {Object.entries(candidatesConfig.categories).map(([category, slugs]) => (
        <CandidateCategoryTile
          key={category}
          slugs={slugs}
          category={category}
        />
      ))}
      <AddServiceTile label={t('add_service')} />
    </div>
    <Media align="top" className="empty-services-list-tip">
      <Img>
        <img src={ArrowIllustration} />
      </Img>
      <Bd className="empty-services-list-text">
        <Title>{t('connector.empty.title')}</Title>
        <Text tag="p">{t('connector.empty.text')}</Text>
      </Bd>
    </Media>
  </>
)

export default translate()(NoServicesList)
