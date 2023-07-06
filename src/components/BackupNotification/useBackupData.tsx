import React, { useState, createContext, useContext } from 'react'

const BackupDataContext = createContext<BackupDataContextInterface | undefined>(
  undefined
)

type BackupStatus = 'to_do' | 'initializing' | 'ready' | 'running' | 'done'

export interface BackupInfo {
  lastBackupDate: number
  backupedMediasCount: number
  currentBackup: {
    status: BackupStatus
    mediasToBackupCount: number
    totalMediasToBackupCount: number
  }
}

interface BackupDataContextInterface {
  backupInfo: BackupInfo | undefined
  setBackupInfo: (value: BackupInfo) => void
}

export const BackupDataProvider = ({
  children
}: {
  children: JSX.Element
}): JSX.Element => {
  const [backupInfo, setBackupInfo] = useState<BackupInfo | undefined>()

  return (
    <BackupDataContext.Provider
      value={{
        backupInfo,
        setBackupInfo
      }}
    >
      {children}
    </BackupDataContext.Provider>
  )
}

export const useBackupData = (): BackupDataContextInterface => {
  const backupDataContext = useContext(BackupDataContext)

  if (!backupDataContext) {
    throw new Error(
      'backupDataContext has to be used within <BackupDataProvider>'
    )
  }

  return backupDataContext
}
