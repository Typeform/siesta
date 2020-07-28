const { getTimeIntervalAsISOString } = require('../time')

describe('getTimeIntervalAsISOString', () => {
  it('should return an interval', () => {
    expect(getTimeIntervalAsISOString(1, new Date('2020-05-08T07:28:15.353Z'))).toEqual({ initialTime: '2020-05-08T07:28:15.353Z', finalTime: '2020-05-08T07:29:15.353Z' })
  })
})
