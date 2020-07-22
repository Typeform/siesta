const { getCalendarFreeBusyResponse, getOAuth2Client } = require('./google-calendar')

/**
 * Authenticates and returns the events of a google calendar
 * @param {string} initialTime from when to start looking
 * @param {string} finalTime to when to stop looking
 * @param {JSON} token Google API Token
 * @param {JSON} credentials Google API Credentials
 * @param {string} calendarId ID of the Google Calendar
 */
const getEventsOfACalendar = async (initialTime, finalTime, token, credentials, calendarId) => {
  const auth = getOAuth2Client(token, credentials)
  return getCalendarEvents(await getCalendarFreeBusyResponse(auth, calendarId, initialTime, finalTime), calendarId)
}

/**
 * Returns the events pf a calendar event
 * @param {Object} googleCalendarResponse from freebusy query
 * @param {string} calendarId
 */
const getCalendarEvents = (googleCalendarResponse, calendarId) => {
  return googleCalendarResponse.data.calendars[calendarId].busy
}

module.exports = {
  getEventsOfACalendar,
  getCalendarEvents,
}
