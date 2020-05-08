require('dotenv').config()

const { getEventsOfACalendar } = require('../infrastructure/google-calendar-manager')
const { getToken, getCredentials, setWarning, setError } = require('../infrastructure/github')
const { getTimeIntervalAsISOString } = require('../domain/time')
const { areThereEvents } = require('../domain/calendar')

const { DEFAULT_MILLISECOND_INTERVAL } = require('./constants')

const main = async () => {
  try {
    const token = getToken()
    const credentials = getCredentials()
    const momentToCheck = getTimeIntervalAsISOString(DEFAULT_MILLISECOND_INTERVAL)
    const siesta = areThereEvents(await getEventsOfACalendar(momentToCheck.initialTime, momentToCheck.finalTime, token, credentials))
    console.log(siesta)
    setWarning(siesta, 'Sorry, no siesta time!')
  } catch (error) {
    setError(error)
  }
}

main()
