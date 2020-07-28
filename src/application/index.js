require('dotenv').config()

const { getEventsOfACalendar } = require('../infrastructure/google-calendar-manager')
const { getToken, getCredentials, getCalendarId, getCustomCalendarBusyMessage,
  getCustomCalendarNotBusyMessage, getMinutesInterval, setGithubOutput,
  throwErrorFailIfBusy, throwErrorFailOnHardFailure } = require('../infrastructure/github')
const { getTimeIntervalAsISOString } = require('../domain/time')
const { areThereEvents } = require('../domain/calendar')

const main = async () => {
  try {
    const { initialTime, finalTime } = getTimeIntervalAsISOString(getMinutesInterval())
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
      throwErrorFailIfBusy(getCustomCalendarBusyMessage())
    } else console.log(getCustomCalendarNotBusyMessage())
  } catch (error) {
    throwErrorFailOnHardFailure(error)
  }
}

main()
