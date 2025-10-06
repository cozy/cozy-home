import { useQuery } from 'cozy-client'

import { mkHomeMagicFolderConn } from '@/queries'

export const useMagicFolder = (): string | undefined => {
  const homeMagicFolderConn = mkHomeMagicFolderConn()
  const { data: magicFolder } = useQuery(
    homeMagicFolderConn.query,
    homeMagicFolderConn
  ) as { data: { _id: string }[] }

  return magicFolder?.[0]?._id
}
