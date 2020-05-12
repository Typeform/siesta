const { getCalendarEvents, getOAuth2Client } = require('./google-calendar')

/**
 * Authenticates and returns the events of a google calendar
 * @param {String} initialTime from when to start looking
 * @param {String} finalTime to when to stop looking
 * @param {JSON} token Google API Token
 * @param {JSON} credentials Google API Credentials
 * @param {String} calendarId ID of the Google Calendar
 */
const getEventsOfACalendar = async (initialTime, finalTime, token, credentials, calendarId) => {
  const auth = getOAuth2Client(token, credentials)
  return await getCalendarEvents(auth, calendarId, initialTime, finalTime)
}

module.exports = {
  getEventsOfACalendar,
}
