import { DndContext, DragOverlay, MeasuringStrategy } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import React, { useMemo } from 'react'

import flag from 'cozy-flags'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { FolderDialog } from './FolderDialog'
import LegacyApplicationsAndServices from './LegacyApplicationsAndServices'
import { SortableTile } from './SortableTile'
import { TileContent } from './TileContent'
import { noSortStrategy } from './dndGeometry'
import { dissolveFolder, removeFromFolder, renameFolder } from './homeLayout'
import { LoadingAppTiles } from './types'
import { useHomeDnd } from './useHomeDnd'
import { useHomeLayout } from './useHomeLayout'

import AddTile from '@/components/AddTile'
import AppHighlightAlertWrapper from '@/components/AppHighlightAlert/AppHighlightAlertWrapper'
import AssistantTile from '@/components/AssistantTile'
import LogoutTile from '@/components/LogoutTile'

export const ApplicationsAndServices = (): JSX.Element => {
  const showLogout = Boolean(flag('home.mainlist.show-logout'))
  const { isMobile } = useBreakpoints()
  const { hasLoaded, isAppsLoading, items, layout, apps, saveLayout } =
    useHomeLayout()
  const appsForAlerts = useMemo(
    () =>
      items
        .filter(i => i.type === 'app')
        .map(i => (i.type === 'app' ? i.app : null))
        .filter(Boolean),
    [items]
  )
  const {
    grid,
    ids,
    combineTargetId,
    openFolder,
    draggedItem,
    effectiveLayout,
    sensors,
    collisionDetection,
    setOpenFolderId,
    handleSave,
    handleDragStart,
    handleDragMove,
    handleDragCancel,
    handleDragEnd
  } = useHomeDnd({ items, layout, saveLayout })

  return (
    <div className="app-list-wrapper u-m-auto u-w-100">
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <div className="app-list app-list--gutter u-pos-relative u-w-100 u-mh-auto u-flex-justify-center">
          {!hasLoaded || isAppsLoading ? (
            <LoadingAppTiles num={6} />
          ) : (
            <SortableContext
              items={ids}
              strategy={combineTargetId ? noSortStrategy : rectSortingStrategy}
            >
              {grid.map(item => (
                <SortableTile
                  key={item.id}
                  item={item}
                  combineTarget={combineTargetId === item.id}
                  onOpenFolder={setOpenFolderId}
                />
              ))}
            </SortableContext>
          )}
          <AppHighlightAlertWrapper apps={appsForAlerts} />
          {isMobile && Boolean(flag('cozy.assistant.legacy.enabled')) && (
            <AssistantTile />
          )}
          <AddTile apps={apps} />
          {showLogout && <LogoutTile />}
        </div>

        {openFolder && (
          <FolderDialog
            folder={openFolder}
            onClose={() => setOpenFolderId(null)}
            onRename={(id, name) =>
              handleSave(renameFolder(effectiveLayout, id, name))
            }
            onDissolve={id => {
              handleSave(dissolveFolder(effectiveLayout, id))
              setOpenFolderId(null)
            }}
            onRemoveItem={(folderId, itemId) =>
              handleSave(removeFromFolder(effectiveLayout, folderId, itemId))
            }
          />
        )}

        <DragOverlay zIndex={1401}>
          {draggedItem ? (
            <div className="home-drag-overlay">
              <TileContent item={draggedItem} onOpenFolder={() => undefined} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

// Entry point: the folders grid is gated behind a flag so it can ship dark and
// be enabled in production when ready. Off (default) keeps the legacy tile list.
const ApplicationsAndServicesEntry = (): JSX.Element =>
  flag('home.apps.folders') ? (
    <ApplicationsAndServices />
  ) : (
    <LegacyApplicationsAndServices />
  )

export default ApplicationsAndServicesEntry
