const core = require('@actions/core')

const getToken = () => {
  return JSON.parse(core.getInput('google-token') || process.env.GOOGLE_TOKEN)
}

const getCredentials = () => {
  return JSON.parse(core.getInput('google-credentials') || process.env.GOOGLE_CREDENTIALS)
}

/**
 * Throws a github warning with message if the whatToCheck is false
 * @param {boolean} whatToCheck
 * @param {String} message
 */
const setWarning = (whatToCheck, message) => {
  if (whatToCheck) return core.warning(message)
}

/**
 * Sets the Github Action to fail
 * @param {Object} error
 */
const setError = (error) => {
  core.setFailed(error.message)
}

module.exports = {
  setError,
  setWarning,
  getToken,
  getCredentials,
}
