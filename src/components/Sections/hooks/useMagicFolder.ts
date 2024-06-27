import { useQuery } from 'cozy-client'

import { mkHomeMagicFolderConn } from 'queries'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

export const useMagicFolder = (): string | undefined => {
  const { t } = useI18n()

  const homeMagicFolderConn = mkHomeMagicFolderConn(t)
  const { data: magicFolder } = useQuery(
    homeMagicFolderConn.query,
    homeMagicFolderConn
  ) as { data: { _id: string }[] }

  return magicFolder?.[0]?._id
}
