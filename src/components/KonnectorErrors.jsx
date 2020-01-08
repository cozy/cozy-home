import React from 'react'
import PropTypes from 'prop-types'
import { withClient, models } from 'cozy-client'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import keyBy from 'lodash/keyBy'
import flow from 'lodash/flow'
import Infos from 'cozy-ui/transpiled/react/Infos'
import InfosCarrousel from 'cozy-ui/transpiled/react/InfosCarrousel'
import Button from 'cozy-ui/transpiled/react/Button'
import Text, { SubTitle } from 'cozy-ui/transpiled/react/Text'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import {
  getTriggersInError,
  getAccountsWithErrors,
  getInstalledKonnectors
} from 'reducers/index'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import AppIcon from 'components/AppIcon'

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

export const KonnectorErrors = ({
  t,
  triggersInError,
  accountsWithErrors,
  installedKonnectors,
  history,
  client
}) => {
  const accountsWithErrorsById = keyBy(accountsWithErrors, '_id')
  const nonMutedTriggerErrors = triggersInError.filter(trigger => {
    const accountId = triggersModel.getAccountId(trigger)
    const account = accountsWithErrorsById[accountId]
    return !triggersModel.isLatestErrorMuted(trigger, account)
  })

  return nonMutedTriggerErrors.length > 0 ? (
    <div className="KonnectorErrors">
      <InfosCarrousel theme="danger">
        {nonMutedTriggerErrors.map((trigger, index) => {
          const errorType = triggerStatesModel.getLastErrorType(trigger)
          const konnectorSlug = triggersModel.getKonnector(trigger)
          const konnectorAccount = triggersModel.getAccountId(trigger)
          const konnector = installedKonnectors.find(
            ({ slug }) => slug === konnectorSlug
          )
          return (
            <Infos
              key={trigger._id}
              description={
                <>
                  <div className="u-fz-tiny u-pomegranate u-flex u-flex-row u-flex-items-center">
                    <AppIcon
                      alt={t('app.logo.alt', { name: konnectorSlug })}
                      app={konnectorSlug}
                      className="u-w-1 u-h-1 u-mr-half"
                    />
                    {konnector.name}
                  </div>
                  <SubTitle>
                    {`(${index + 1}/${nonMutedTriggerErrors.length}) `}
                    {t(`connection.error.${errorType}.title`)}
                  </SubTitle>
                  <Text>
                    <ReactMarkdownWrapper
                      source={t(`connection.error.${errorType}.description`, {
                        name: konnector.name,
                        link: konnector.vendor_link
                      })}
                    />
                  </Text>
                </>
              }
              action={
                <Button
                  theme="secondary"
                  label={t('fix_konnector_error')}
                  className="u-mh-0"
                  onClick={() =>
                    history.push(
                      `/connected/${konnectorSlug}/accounts/${konnectorAccount}`
                    )
                  }
                />
              }
              dismissAction={() =>
                muteTrigger(client, trigger, accountsWithErrorsById)
              }
            />
          )
        })}
      </InfosCarrousel>
    </div>
  ) : null
}

KonnectorErrors.propTypes = {
  t: PropTypes.func.isRequired,
  triggersInError: PropTypes.array.isRequired,
  accountsWithErrors: PropTypes.array.isRequired,
  installedKonnectors: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
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
  withRouter,
  withClient,
  translate()
)(KonnectorErrors)
