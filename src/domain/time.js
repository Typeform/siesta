/**
 * Returns an interval between the present moment and a later time, controlled by the parameter
 * @param {int} minutesInterval -- defers the final time
 * @param {Date} now -- optional, current time
 */
const getTimeIntervalAsISOString = (minutesInterval, now = new Date()) => {
  const initialTime = now
  const finalTime = new Date(initialTime.getTime() + minutesInterval * 60000)
  return { initialTime: initialTime.toISOString(), finalTime: finalTime.toISOString() }
}

module.exports = {
  getTimeIntervalAsISOString,
}
