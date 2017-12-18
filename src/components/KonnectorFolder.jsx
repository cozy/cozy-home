import React from 'react'
import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'
import Modal, { ModalContent } from 'cozy-ui/react/Modal'

import styles from '../styles/konnectorFolder'

import DescriptionContent from './DescriptionContent'
import Field, { FolderPickerField } from './Field'

class KonnectorFolder extends React.Component {
  componentDidMount = () => {
    const { fields } = this.props
    this.setState({
      fields: fields,
      isModalOpen: false,
      folderUpdateStatus: null
    })
  }

  componentWillReceiveProps = newProps => {
    this.setState({
      fields: newProps.fields
    })
  }

  openModal = event => {
    event.preventDefault()
    this.setState({ isModalOpen: true })
  }

  updateFolderPath = () => {
    const { connector, account } = this.props
    const folderId = this.props.trigger.message.folder_to_save
    const { store } = this.context
    const { fields } = this.state
    this.setState({
      isFetching: true
    })

    const namePath = fields.namePath.value
    const folderPath = fields.folderPath.value

    store
      .updateFolderPath(connector, account, folderId, {
        namePath: namePath,
        folderPath: `${folderPath}/${namePath}`
      })
      .then(() => {
        this.setState({
          isFetching: false,
          folderUpdateStatus: 'ok'
        })
      })
      .catch(error => {
        if (error) {
          this.setState({
            isFetching: false,
            folderUpdateStatus: 'error'
          })
        }
      })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false, folderUpdateStatus: null })
  }

  render(
    { t, account, driveUrl, connector, trigger },
    { fields, isModalOpen, isFetching, changeState, folderUpdateStatus }
  ) {
    return (
      <div className={styles['col-account-folder']}>
        {account &&
          account.auth && (
            <DescriptionContent title={t('account.folder.title')}>
              <p>
                {!!fields && (
                  <form onSubmit={this.openModal}>
                    <Field
                      label={t('account.form.label.namePath')}
                      {...fields.namePath}
                    />
                    <FolderPickerField
                      label={t('account.form.label.folderPath')}
                      {...fields.folderPath}
                    />
                    <Button
                      theme="secondary"
                      className={styles['col-account-folder-save-btn']}
                    >
                      {t('account.form.button.save')}
                    </Button>
                  </form>
                )}
                {driveUrl && (
                  <a
                    className={styles['col-account-folder-link']}
                    href={`${driveUrl}${trigger.message.folder_to_save}`}
                  >
                    {t('account.folder.link')}
                  </a>
                )}
              </p>
              {isModalOpen && (
                <Modal
                  secondaryAction={this.closeModal}
                  title={t('account.folder.warning')}
                  className={styles['col-account-folder-modal-path']}
                >
                  <ModalContent>
                    <p>{t('account.folder.oldFiles')}</p>
                    <p>{t('account.folder.newFiles')}</p>
                    {!isFetching &&
                      folderUpdateStatus === 'ok' && (
                        <div>
                          <p>
                            <b>
                              {t('account.folder.newPath', {
                                name: connector.name
                              })}
                            </b>
                          </p>
                          <p>
                            <span
                              className={
                                styles['col-account-folder-highlighted-data']
                              }
                            >
                              {`${fields.folderPath.value}/${fields.namePath
                                .value}`}
                            </span>
                          </p>
                        </div>
                      )}

                    {!isFetching &&
                      folderUpdateStatus === 'error' && (
                        <p>{t('account.folder.error')}</p>
                      )}

                    <p className={styles['col-account-folder-modal-path-btn']}>
                      {folderUpdateStatus ? (
                        <Button theme="secondary" onClick={this.closeModal}>
                          {t('account.folder.close')}
                        </Button>
                      ) : (
                        <Button
                          busy={isFetching}
                          theme="regular"
                          onClick={this.updateFolderPath}
                        >
                          {t('account.folder.changePath')}
                        </Button>
                      )}
                    </p>
                  </ModalContent>
                </Modal>
              )}
            </DescriptionContent>
          )}
      </div>
    )
  }
}

export default translate()(KonnectorFolder)
