import { useQuery } from 'cozy-client'
import { mkHomeCustomShorcutsDirConn, mkHomeCustomShorcutsConn } from 'queries'
import { formatShortcuts } from 'components/Shortcuts/utils'
import { Section } from 'components/Sections/SectionsTypes'

export const useShortcutsDirectories = (
  magicHomeFolderId?: string
): Section[] => {
  const homeShortcutsDirConn = mkHomeCustomShorcutsDirConn({
    currentFolderId: magicHomeFolderId
  })
  const canHaveShortcuts = !!magicHomeFolderId
  const { data: folders } = useQuery(homeShortcutsDirConn.query, {
    ...homeShortcutsDirConn.options,
    enabled: canHaveShortcuts
  }) as { data: { _id: string }[] }

  const customHomeShortcutsConn = mkHomeCustomShorcutsConn(
    folders && folders.map(folder => folder._id)
  )
  const { data: customHomeShortcuts } = useQuery(
    customHomeShortcutsConn.query,
    {
      ...customHomeShortcutsConn,
      enabled: Boolean(folders && folders.length > 0)
    }
  )

  return canHaveShortcuts
    ? (formatShortcuts(folders, customHomeShortcuts) as Section[])
    : []
}
