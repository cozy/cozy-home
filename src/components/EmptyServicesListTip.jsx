import React from 'react'

import { Title, Text } from 'cozy-ui/react/Text'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'
import { translate } from 'cozy-ui/react/I18n'
import ArrowIllustration from 'assets/images/drawing-arrow-up.svg'

const EmptyServicesListTip = ({ t }) => (
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
)

export default translate()(EmptyServicesListTip)
