require('dotenv').config()

const { getEventsOfACalendar } = require('../infrastructure/google-calendar-manager')
const { getToken, getCredentials, getCalendarId, getCustomCalendarBusyMessage, getCustomCalendarNotBusyMessage, setGithubOutput, throwGithubError } = require('../infrastructure/github')
const { getTimeIntervalAsISOString } = require('../domain/time')
const { areThereEvents } = require('../domain/calendar')

const { DEFAULT_MILLISECOND_INTERVAL } = require('./constants')

const main = async () => {
  try {
    const { initialTime, finalTime } = getTimeIntervalAsISOString(DEFAULT_MILLISECOND_INTERVAL)
    const isCalendarBusyAtTheMomentToCheck = areThereEvents(
      await getEventsOfACalendar(
        initialTime,
        finalTime,
        getToken(),
        getCredentials(),
        getCalendarId(),
      ),
    )
    setGithubOutput(isCalendarBusyAtTheMomentToCheck)
    if (isCalendarBusyAtTheMomentToCheck) {
      throwGithubError(getCustomCalendarBusyMessage())
    } else console.log(getCustomCalendarNotBusyMessage())
  } catch (error) {
    throwGithubError(error.message)
  }
}

main()
