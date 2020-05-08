/**
 * Checks if there are events, and returns a boolean
 * @param {Array} events
 */
const areThereEvents = (events) => {
  return !!events.length
}

module.exports = {
  areThereEvents,
}
