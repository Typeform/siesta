const core = require('@actions/core')

const {
  DEFAULT_GOOGLE_CREDENTIALS,
  DEFAULT_GOOGLE_TOKEN,
  DEFAULT_CALENDAR_ID,
  DEFAULT_CUSTOM_CALENDAR_BUSY_MESSAGE,
  DEFAULT_CUSTOM_CALENDAR_NOT_BUSY_MESSAGE,
  DEFAULT_FAIL_IF_BUSY,
  DEFAULT_HARD_FAILURE,
} = require('./constants')

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
 * Gets failIfBusy
 */
const getFailIfBusy = () => {
  return core.getInput('fail-if-busy') || DEFAULT_FAIL_IF_BUSY
}

/**
 * Gets hard-failure
 */
const getHardFailure = () => {
  const shouldHardFailure = core.getInput('hard-failure') || DEFAULT_HARD_FAILURE
  if (shouldHardFailure.toLowerCase() === 'true') return true
  return false
}

/**
 * Throws an error if hard-failure is true
 * @param {Object} error
 */
const throwErrorFailOnHardFailure = (error) => {
  if (getHardFailure()) throwGithubError(error.message)
  throwGithubWarning(error.message)
}

/**
 * Throws an error if getFailIfBusyIsTrue
 * @param {string} message
 */
const throwErrorFailIfBusy = (message) => {
  try {
    if (getFailIfBusy().toLowerCase() === 'true') throwGithubError(message)
  } catch (e) {
    throw new Error(`Incorrect FAIL_IF_BUSY:${e}`)
  }
}

/**
 * Sets the Github Action to fail
 * @param {string} message
 */
const throwGithubError = (message) => {
  core.setFailed(message)
}

/**
 * Sets a Github warning in the console
 * @param {string} message
 */
const throwGithubWarning = (message) => {
  core.warning(message)
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
  throwErrorFailIfBusy,
  getHardFailure,
  throwErrorFailOnHardFailure,
  getFailIfBusy,
  throwGithubWarning,
}
