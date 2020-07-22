const { getCalendarEvents } = require('../google-calendar-manager')
describe('getCalendarEvents', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return events', () => {
    const response = {
      data: {
        kind: 'calendar#freeBusy',
        timeMin: '2020-05-13T14:59:29.000Z',
        timeMax: '2020-05-13T14:59:35.000Z',
        calendars: {
          calendarId: {
            busy:
            [{
              start: '2020-05-13T15:02:19Z',
              end: '2020-05-13T15:02:25Z',
            }],
          },
        },
      },
    }
    expect(getCalendarEvents(response, 'calendarId')).toEqual([{ start: '2020-05-13T15:02:19Z', end: '2020-05-13T15:02:25Z' }])
  })
  it('should throw an error in case of incorrect response', () => {
    const response = {}
    try {
      getCalendarEvents(response, 'calendarId')
    } catch (e) {
      expect(e.message).toEqual('Cannot read property \'calendars\' of undefined')
    }
  })
})
