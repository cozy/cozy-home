import { useEffect, useState, RefObject } from 'react'

interface ContainerDimensions {
  width: number
  height: number
}

export const useContainerDimensions = (
  containerRef: RefObject<HTMLDivElement>
): ContainerDimensions => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const getDimensions = (): ContainerDimensions => {
      return {
        // @ts-expect-error containerRef.current never null when here in this hook
        width: containerRef.current.offsetWidth,
        // @ts-expect-error containerRef.current never null when here in this hook
        height: containerRef.current.offsetHeight
      }
    }

    const handleResize = (): void => {
      setDimensions(getDimensions())
    }

    if (containerRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [containerRef])

  return dimensions
}
