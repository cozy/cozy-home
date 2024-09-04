import { getUnseenAnnouncements } from './helpers'

describe('getUnseenAnnouncements', () => {
  it('should return unseen announcements', () => {
    const data = [
      { attributes: { uuid: '1', title: 'Announcement 1' } },
      { attributes: { uuid: '2', title: 'Announcement 2' } },
      { attributes: { uuid: '3', title: 'Announcement 3' } }
    ]
    const announcements_seen = ['1', '3']
    const expected = [{ attributes: { uuid: '2', title: 'Announcement 2' } }]

    const result = getUnseenAnnouncements(data, announcements_seen)

    expect(result).toEqual(expected)
  })

  it('should return all announcements if announcements_seen is empty', () => {
    const data = [
      { attributes: { uuid: '1', title: 'Announcement 1' } },
      { attributes: { uuid: '2', title: 'Announcement 2' } },
      { attributes: { uuid: '3', title: 'Announcement 3' } }
    ]
    const announcements_seen = []
    const expected = [
      { attributes: { uuid: '1', title: 'Announcement 1' } },
      { attributes: { uuid: '2', title: 'Announcement 2' } },
      { attributes: { uuid: '3', title: 'Announcement 3' } }
    ]

    const result = getUnseenAnnouncements(data, announcements_seen)

    expect(result).toEqual(expected)
  })

  it('should return all announcements if announcements_seen is null', () => {
    const data = [
      { attributes: { uuid: '1', title: 'Announcement 1' } },
      { attributes: { uuid: '2', title: 'Announcement 2' } },
      { attributes: { uuid: '3', title: 'Announcement 3' } }
    ]
    const announcements_seen = null
    const expected = [
      { attributes: { uuid: '1', title: 'Announcement 1' } },
      { attributes: { uuid: '2', title: 'Announcement 2' } },
      { attributes: { uuid: '3', title: 'Announcement 3' } }
    ]

    const result = getUnseenAnnouncements(data, announcements_seen)

    expect(result).toEqual(expected)
  })
})
