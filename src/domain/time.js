/**
 * Returns an interval between the present moment and a later time, controlled by the parameter
 * @param {int} millisecondsInterval -- defers the final time
 * @param {Date} now -- optional, current time
 */
const getTimeIntervalAsISOString = (millisecondsInterval, now = new Date()) => {
  const initialTime = now
  const finalTime = new Date(initialTime.getTime() + millisecondsInterval)
  return { initialTime: initialTime.toISOString(), finalTime: finalTime.toISOString() }
}

module.exports = {
  getTimeIntervalAsISOString,
}
