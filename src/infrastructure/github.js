const core = require('@actions/core')

const token = JSON.parse(core.getInput('google-token') || process.env.GOOGLE_TOKEN)
const credentials = JSON.parse(core.getInput('google-credentials') || process.env.GOOGLE_CREDENTIALS)

/**
 * Throws a github warning with message if the whatToCheck is false
 * @param {boolean} whatToCheck
 * @param {String} message
 */
const setWarning = (whatToCheck, message) => {
  if (whatToCheck) return core.warning(message)
}

module.exports = {
  setWarning,
  token,
  credentials,
}
