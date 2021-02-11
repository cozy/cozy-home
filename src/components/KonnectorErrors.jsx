import React from 'react'
import PropTypes from 'prop-types'
import { useClient, models } from 'cozy-client'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import keyBy from 'lodash/keyBy'
import flow from 'lodash/flow'
import Infos from 'cozy-ui/transpiled/react/Infos'
import Typography from 'cozy-ui/transpiled/react/Typography'
import InfosCarrousel from 'cozy-ui/transpiled/react/InfosCarrousel'
import Button from 'cozy-ui/transpiled/react/Button'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import CrossButton from 'cozy-ui/transpiled/react/Icons/Cross'
import { Media, Bd } from 'cozy-ui/transpiled/react/Media'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import {
  getTriggersInError,
  getAccountsWithErrors,
  getInstalledKonnectors
} from 'reducers/index'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import homeConfig from 'config/home.json'
import { getErrorLocaleBound, KonnectorJobError } from 'cozy-harvest-lib'

const {
  triggers: { triggers: triggersModel, triggerStates: triggerStatesModel },
  accounts: accountsModel
} = models

const muteTrigger = async (client, trigger, accountsById) => {
  const accountId = triggersModel.getAccountId(trigger)
  const initialAccount = accountsById[accountId]
  const errorType = triggerStatesModel.getLastErrorType(trigger)
  const account = accountsModel.muteError(initialAccount, errorType)

  await client.save(account)
}

const getKonnectorSlug = konnector => konnector.slug

// TODO, use directly Infos prop dismissAction when
// https://github.com/cozy/cozy-ui/pull/1724 is merged
// Here we need the aria-label for tests, and IconButton for style
const InfosDismissButton = ({ onClick }) => {
  const { t } = useI18n()
  return (
    <IconButton
      aria-label={t('connector.mute')}
      onClick={onClick}
      style={dismissButtonStyle}
    >
      <Icon icon={CrossButton} size={12} />
    </IconButton>
  )
}

const dismissButtonStyle = {
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem'
}

const KonnectorError = ({
  trigger,
  triggerErrors,
  index,
  konnectorsBySlug,
  accountsById,
  history
}) => {
  const client = useClient()
  const { t, lang } = useI18n()
  const { isMobile } = useBreakpoints()
  const errorType = triggerStatesModel.getLastErrorType(trigger)
  const konnError = new KonnectorJobError(errorType)
  const konnectorSlug = triggersModel.getKonnector(trigger)
  const konnectorAccount = triggersModel.getAccountId(trigger)
  const konnector = konnectorsBySlug[konnectorSlug]

  const errorTitle = getErrorLocaleBound(konnError, konnector, lang, 'title')

  const errorDescription = getErrorLocaleBound(
    konnError,
    konnector,
    lang,
    'description'
  )

  const handleDismiss = () => {
    muteTrigger(client, trigger, accountsById)
  }

  return (
    <Infos
      theme="danger"
      key={trigger._id}
      description={
        <>
          <InfosDismissButton onClick={handleDismiss} />
          <Media>
            <AppIcon
              alt={t('app.logo.alt', { name: konnectorSlug })}
              app={konnectorSlug}
              className="u-w-2 u-h-2 u-w-1-half-s u-h-1-half-s u-mr-1"
            />
            <Bd>
              <Typography variant="caption" color="error">
                {konnector.name}
              </Typography>
              <Typography variant="h5" className="u-error">
                {triggerErrors.length > 1
                  ? `(${index + 1}/${triggerErrors.length}) `
                  : null}
                {errorTitle}
              </Typography>
            </Bd>
          </Media>
          <div>
            <Typography
              component="div"
              variant="body1"
              className="u-fz-small-m"
            >
              <ReactMarkdownWrapper source={errorDescription} />
            </Typography>
          </div>
        </>
      }
      action={
        <Button
          theme="secondary"
          label={t('fix_konnector_error')}
          className="u-mh-0"
          size={isMobile ? 'small' : 'normal'}
          onClick={() =>
            history.push(
              `/connected/${konnectorSlug}/accounts/${konnectorAccount}`
            )
          }
        />
      }
    />
  )
}

export const KonnectorErrors = ({
  triggersInError,
  accountsWithErrors,
  installedKonnectors,
  history
}) => {
  const accountsWithErrorsById = keyBy(accountsWithErrors, '_id')
  const installedKonnectorsBySlug = keyBy(installedKonnectors, getKonnectorSlug)
  const nonMutedTriggerErrors = triggersInError.filter(trigger => {
    const errorType = triggerStatesModel.getLastErrorType(trigger)
    const accountId = triggersModel.getAccountId(trigger)
    const account = accountsWithErrorsById[accountId]
    const konnectorSlug = triggersModel.getKonnector(trigger)
    const hasInstalledKonnector =
      installedKonnectors &&
      installedKonnectors.some(({ slug }) => slug === konnectorSlug)

    return (
      homeConfig.displayedErrorTypes.includes(errorType) &&
      hasInstalledKonnector &&
      account &&
      !triggersModel.isLatestErrorMuted(trigger, account)
    )
  })

  return nonMutedTriggerErrors.length > 0 ? (
    <div className="KonnectorErrors">
      <InfosCarrousel theme="danger">
        {nonMutedTriggerErrors.map((trigger, index) => (
          <KonnectorError
            key={trigger._id}
            history={history}
            trigger={trigger}
            triggerErrors={nonMutedTriggerErrors}
            konnectorsBySlug={installedKonnectorsBySlug}
            accountsById={accountsWithErrorsById}
            index={index}
          />
        ))}
      </InfosCarrousel>
    </div>
  ) : null
}

KonnectorErrors.propTypes = {
  triggersInError: PropTypes.array.isRequired,
  accountsWithErrors: PropTypes.array.isRequired,
  installedKonnectors: PropTypes.arrayOf(PropTypes.object.isRequired),
  history: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    triggersInError: getTriggersInError(state),
    accountsWithErrors: getAccountsWithErrors(state),
    installedKonnectors: getInstalledKonnectors(state)
  }
}

export default flow(
  connect(mapStateToProps),
  withRouter
)(KonnectorErrors)
