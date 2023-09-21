import { getHomeLogos } from 'components/FooterLogo/helpers'

describe('getHomeLogos', () => {
  const setupData = home_logos => {
    return {
      attributes: {
        home_logos
      }
    }
  }
  const rootURL = 'http://example.com'

  it('should return {} by default', () => {
    expect(getHomeLogos()).toStrictEqual({})
  })

  it('should return secondaries', () => {
    const data = setupData({
      '/logos/1_partner.png': 'Partner n°1',
      '/logos/2_partner.png': 'Partner n°2'
    })
    expect(getHomeLogos(data, rootURL)).toStrictEqual({
      secondaries: {
        'http://example.com/assets/logos/1_partner.png': 'Partner n°1',
        'http://example.com/assets/logos/2_partner.png': 'Partner n°2'
      }
    })
  })

  it('should return secondaries should respect order', () => {
    const data = setupData({
      '/logos/A.gif': 'Partner A',
      '/logos/1_partner.png': 'Partner n°1',
      '/logos/3_partner.png': 'Partner n°3',
      '/logos/2_partner.png': 'Partner n°2'
    })
    expect(getHomeLogos(data, rootURL)).toStrictEqual({
      secondaries: {
        'http://example.com/assets/logos/1_partner.png': 'Partner n°1',
        'http://example.com/assets/logos/2_partner.png': 'Partner n°2',
        'http://example.com/assets/logos/3_partner.png': 'Partner n°3',
        'http://example.com/assets/logos/A.gif': 'Partner A'
      }
    })
  })

  it('should return main and secondaries', () => {
    const data = setupData({
      '/logos/2_partner.png': 'Partner n°2',
      '/logos/1_partner.png': 'Partner n°1',
      '/logos/main_partner.png': 'Main partner',
      '/logos/3_partner.png': 'Partner n°3'
    })
    expect(getHomeLogos(data, rootURL)).toStrictEqual({
      main: {
        url: 'http://example.com/assets/logos/main_partner.png',
        alt: 'Main partner'
      },
      secondaries: {
        'http://example.com/assets/logos/1_partner.png': 'Partner n°1',
        'http://example.com/assets/logos/2_partner.png': 'Partner n°2',
        'http://example.com/assets/logos/3_partner.png': 'Partner n°3'
      }
    })
  })
})
