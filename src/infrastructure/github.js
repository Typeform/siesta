const core = require('@actions/core')

const { DEFAULT_GOOGLE_CREDENTIALS, DEFAULT_GOOGLE_TOKEN, DEFAULT_CALENDAR_ID, DEFAULT_CUSTOM_CALENDAR_BUSY_MESSAGE, DEFAULT_CUSTOM_CALENDAR_NOT_BUSY_MESSAGE } = require('./constants')

/**
 * Gets token and parses it
 */
const getToken = () => {
  const token = core.getInput('google-token') || DEFAULT_GOOGLE_TOKEN
  if (token) try { return JSON.parse(token) } catch (e) { throw new Error(`Failed to parse token: ${e}`) }
  throw new Error('Missing Token')
}

/**
 * Gets credentials and parses it
 */
const getCredentials = () => {
  const token = core.getInput('google-credentials') || DEFAULT_GOOGLE_CREDENTIALS
  if (token) try { return JSON.parse(token) } catch (e) { throw new Error(`Failed to parse credentials: ${e}`) }
  throw new Error('Missing Credentials')
}

/**
 * Gets calendarId
 */
const getCalendarId = () => {
  return (core.getInput('google-calendar-id') || DEFAULT_CALENDAR_ID)
}

/**
 * Gets customCalendarBusyMessage
 */
const getCustomCalendarBusyMessage = () => {
  return (core.getInput('custom-calendar-busy-message') || DEFAULT_CUSTOM_CALENDAR_BUSY_MESSAGE)
}

/**
 * Gets customCalendarNotBusyMessage
 */
const getCustomCalendarNotBusyMessage = () => {
  return (core.getInput('custom-calendar-not-busy-message') || DEFAULT_CUSTOM_CALENDAR_NOT_BUSY_MESSAGE)
}

/**
 * Sets the Github Action to fail
 * @param {string} message
 */
const throwGithubError = (message) => {
  core.setFailed(message)
}

/**
 * Sets github output
 * @param {boolean} output
 */
const setGithubOutput = (output) => {
  return core.setOutput('calendar-busy', output)
}

module.exports = {
  throwGithubError,
  getToken,
  getCredentials,
  getCalendarId,
  getCustomCalendarBusyMessage,
  getCustomCalendarNotBusyMessage,
  setGithubOutput,
}
