import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Title, Text } from 'cozy-ui/react/Text'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'
import { queryConnect } from 'cozy-client'

import CandidateServiceTile from 'components/CandidateServiceTile'
import CandidateCategoryTile from 'components/CandidateCategoryTile'
import AddServiceTile from 'components/AddServiceTile'
import candidatesConfig from 'config/candidates'
import ArrowIllustration from 'assets/images/drawing-arrow-up.svg'

export const NoServicesList = ({ t, konnectorSuggestions }) => (
  <>
    <div className="services-list">
      {konnectorSuggestions.data.map(suggestion => (
        <CandidateServiceTile key={suggestion.slug} konnector={suggestion} />
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
    {konnectorSuggestions.data.length >= 1 && (
      <Media align="top" className="EmptyServicesListTip">
        <Img>
          <img src={ArrowIllustration} />
        </Img>
        <Bd className="EmptyServicesListTip-text">
          <Title>{t('connector.empty.title')}</Title>
          <Text tag="p" className="u-mv-half">
            {t('connector.empty.text')}
          </Text>
        </Bd>
      </Media>
    )}
  </>
)

const query = client =>
  client.find('io.cozy.apps.suggestions').where({ silenced: false })

const queryOpts = { konnectorSuggestions: { query } }

const ConnectedNoServicesList = queryConnect(queryOpts)(NoServicesList)

export default translate()(ConnectedNoServicesList)
