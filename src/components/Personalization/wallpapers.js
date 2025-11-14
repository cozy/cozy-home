export const Wallpapers = [
  {
    key: 'bg_custom',
    role: 'import',
    label: 'Importer',
    image: 'role_import.svg'
  },
  {
    key: 'bg_twp_default',
    label: 'Twake Default',
    role: 'default',
    lightThumbnail: 'default_light_thumbnail.svg'
  },
  {
    key: 'bg_twp_orbitalblue',
    label: 'Orbital Blue',
    image: 'bg_twp_orbitalblue.jpg',
    labelColor: 'var(--black)'
  },
  {
    key: 'bg_twp_earlymorning',
    label: 'Early Morning',
    image: 'bg_twp_earlymorning.jpg',
    labelColor: 'var(--white)'
  },
  {
    key: 'bg_twp_eclipse',
    label: 'Eclipse',
    image: 'bg_twp_eclipse.svg',
    labelColor: 'var(--black)'
  },
  {
    key: 'bg_twp_dawn',
    label: 'Dawn',
    image: 'bg_twp_dawn.jpg',
    labelColor: 'var(--white)'
  },
  {
    key: 'bg_twp_stellarburst',
    label: 'Stellar Burst',
    image: 'bg_twp_stellarburst.jpg',
    labelColor: 'var(--white)'
  },
  {
    key: 'bg_twp_stripes',
    label: 'Stripes',
    image: 'bg_twp_stripes.jpg',
    labelColor: 'var(--white)'
  }
]

export const ALLOWED_WALLPAPER_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
])
