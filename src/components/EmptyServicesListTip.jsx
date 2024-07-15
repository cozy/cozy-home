import React from 'react'

import { Media, Img, Bd } from 'cozy-ui/transpiled/react/deprecated/Media'
import ArrowIllustration from 'assets/icons/drawing-arrow-up.svg'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'

export const EmptyServicesListTip = () => {
  const { t } = useI18n()

  return (
    <Media align="top" className="EmptyServicesListTip">
      <Img>
        <Icon
          icon={ArrowIllustration}
          width={40}
          height={36}
          color="var(--iconTextColor)"
        />
      </Img>
      <Bd className="EmptyServicesListTip-text">
        <Typography variant="h4">{t('connector.empty.title')}</Typography>
        <Typography tag="p" className="u-mv-half" variant="body1">
          {t('connector.empty.text')}
        </Typography>
      </Bd>
    </Media>
  )
}

export default EmptyServicesListTip
