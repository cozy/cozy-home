import { useClient, generateWebLink } from 'cozy-client'

export const useDefaultWallpaper = (): string | undefined => {
  const client = useClient()

  const wallpaper = client
    ? generateWebLink({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        cozyUrl: client.getStackClient().uri,
        pathname: '/assets/default-wallpaper.svg',
        hash: '',
        searchParams: [],
        slug: 'home',
        // @ts-expect-error subdomain is not typed
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        subDomainType: client.getInstanceOptions().subdomain
      })
    : undefined

  return wallpaper
}
