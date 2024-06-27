import { useQuery } from 'cozy-client'
import { mkHomeMagicFolderConn } from 'queries'

export const useMagicFolder = (
  t: (key: string) => string
): string | undefined => {
  const homeMagicFolderConn = mkHomeMagicFolderConn(t)
  const { data: magicFolder } = useQuery(
    homeMagicFolderConn.query,
    homeMagicFolderConn
  ) as { data: { _id: string }[] }

  return magicFolder?.[0]?._id
}
