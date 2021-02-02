import React from 'react'

import { Title, Text } from 'cozy-ui/transpiled/react/Text'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'
import ArrowIllustration from 'assets/images/drawing-arrow-up.svg'
import { useI18n } from 'cozy-ui/transpiled/react'

export const EmptyServicesListTip = () => {
  const { t } = useI18n()

  return (
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
}

export default EmptyServicesListTip
