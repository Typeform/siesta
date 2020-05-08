const { areThereEvents } = require('../calendar')

describe('areThereEvents', () => {
  it('should return false when no events', () => {
    expect(areThereEvents([])).toBe(false)
  })
  it('should return true when there are events', () => {
    expect(areThereEvents([{ start: '2020-05-08T06:59:59Z', end: '2020-05-08T07:00:05Z' }])).toBe(true)
  })
})
