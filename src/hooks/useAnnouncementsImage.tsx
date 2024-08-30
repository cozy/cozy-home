import { useEffect, useState } from 'react'
import { useClient } from 'cozy-client'
import { AnnouncementsConfig } from 'components/Announcements/types'
import flag from 'cozy-flags'

/**
 * An hook to fetch an image from the announcements remote doctype.
 *
 * We need to fetch it inside using the url directly inside an <img> tag
 * because of the token to get throw the cozy-stack.
 *
 * @param url - The URL of the image to fetch inside announcements API
 */
const useAnnouncementsImage = (url: string | undefined): string | null => {
  const client = useClient()
  const [image, setImage] = useState<string | null>(null)
  const config = flag<AnnouncementsConfig>('home.announcements')

  useEffect(() => {
    const fetchImage = async (): Promise<void> => {
      const urlWithoutPrefix = (url ?? '').replace('/uploads/', '')
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const fetchBinary = (await client?.stackClient.fetch(
          'GET',
          `/remote/${config.remoteDoctype}.uploads?url=${urlWithoutPrefix}`
        )) as Response
        const blob = await fetchBinary.blob()
        setImage(URL.createObjectURL(blob))
      } catch (error) {
        setImage(null)
      }
    }

    if (!image && url) {
      void fetchImage()
    }
  }, [client, config.remoteDoctype, image, url])

  return image
}

export { useAnnouncementsImage }
