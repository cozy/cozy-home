import ArrowIllustration from 'assets/images/drawing-arrow-up.svg'
import React from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/deprecated/Media'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const EmptyServicesListTip = () => {
  const { t } = useI18n()

  return (
    <Media align="top" className="EmptyServicesListTip">
      <Img>
        <img src={ArrowIllustration} color="white" />
      </Img>
      <Bd className="EmptyServicesListTip-text">
        <Typography className="u-white" variant="h4">
          {t('connector.empty.title')}
        </Typography>
        <Typography tag="p" className="u-mv-half u-white" variant="body1">
          {t('connector.empty.text')}
        </Typography>
      </Bd>
    </Media>
  )
}

export default EmptyServicesListTip
