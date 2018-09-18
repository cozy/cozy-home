import React from 'react'
import { translate } from 'cozy-ui/react/I18n'

import styles from '../styles/konnectorFolder'

import DescriptionContent from './DescriptionContent'

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
    const { account, folders } = this.props
    const folderId = this.props.trigger.message.folder_to_save
    const { store } = this.context
    const { fields } = this.state
    this.setState({
      isFetchingUpdateUpdate: true
    })

    const namePath = fields.namePath.value
    const folderPath = fields.folderPath.value
    const fullFolderPath = `${fields.folderPath.value}/${fields.namePath.value}`
    const dirId = folders.find(folder => folder.path === folderPath)._id

    store
      .updateFolderPath(account, folderId, {
        namePath: namePath,
        folderPath: fullFolderPath,
        dir_id: dirId
      })
      .then(() => {
        this.setState({
          isFetchingUpdate: false,
          folderUpdateStatus: 'ok'
        })
      })
      .catch(error => {
        if (error) {
          this.setState({
            isFetchingUpdate: false,
            folderUpdateStatus: 'error'
          })
        }
      })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false, folderUpdateStatus: null })
  }

  render(
    { t, account, driveUrl, connector, trigger, closeModal },
    { fields, isModalOpen, isFetchingUpdate, changeState, folderUpdateStatus }
  ) {
    return (
      <div className={styles['col-account-folder']}>
        {account &&
          account.auth && (
            <DescriptionContent title={t('account.folder.title')}>
              {driveUrl && (
                <a
                  className={styles['col-account-folder-link']}
                  href={`${driveUrl}${trigger.message.folder_to_save}`}
                >
                  {t('account.folder.link')}
                </a>
              )}
            </DescriptionContent>
          )}
      </div>
    )
  }
}

export default translate()(KonnectorFolder)
