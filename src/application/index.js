require('dotenv').config()
const core = require('@actions/core')

// const github = require('@actions/github')
const { getEventsOfACalendar } = require('../infrastructure/google-calendar-manager')
const { token, credentials, setWarning } = require('../infrastructure/github')
const { getTimeIntervalAsISOString } = require('../domain/time')
const { areThereEvents } = require('../domain/calendar')

const { DEFAULT_MILLISECOND_INTERVAL } = require('./constants')

const main = async () => {
  try {
    const momentToCheck = getTimeIntervalAsISOString(DEFAULT_MILLISECOND_INTERVAL)
    const siesta = areThereEvents(await getEventsOfACalendar(momentToCheck.initialTime, momentToCheck.finalTime, token, credentials))
    console.log(siesta)
    setWarning(siesta, 'Sorry, no siesta time!')
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
