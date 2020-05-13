jest.mock('@actions/core')

describe('getToken', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return parsed json if input is given', () => {
    jest.mock('../constants', () => ({ DEFAULT_GOOGLE_TOKEN: '{"access_token":"123","refresh_token":"123","scope":"https://www.googleapis.com/auth/calendar.readonly","token_type":"Bearer","expiry_date":1588771384793}' }))
    // eslint-disable-next-line global-require
    const { getToken } = require('../github')
    expect(getToken()).toEqual({ access_token: '123', refresh_token: '123', scope: 'https://www.googleapis.com/auth/calendar.readonly', token_type: 'Bearer', expiry_date: 1588771384793 })
  })
  it('should throw error if no token is specified', () => {
    jest.mock('../constants', () => ({ DEFAULT_GOOGLE_TOKEN: '' }))
    // eslint-disable-next-line global-require
    const { getToken } = require('../github')
    try {
      getToken()
    } catch (e) {
      expect(e.message).toEqual('Missing Token')
    }
  })
  it('should throw error if token is not JSON format ', () => {
    jest.mock('../constants', () => ({ DEFAULT_GOOGLE_TOKEN: 'This has wrong format' }))
    // eslint-disable-next-line global-require
    const { getToken } = require('../github')
    try {
      getToken()
    } catch (e) {
      expect(e.message).toEqual('Failed to parse token: SyntaxError: Unexpected token T in JSON at position 0')
    }
  })
})

describe('getCredentials', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return parsed json if input is given', () => {
    jest.mock('../constants', () => ({ DEFAULT_GOOGLE_CREDENTIALS: '{"installed":{"client_id":"123","project_id":"123","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"123","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}' }))
    // eslint-disable-next-line global-require
    const { getCredentials } = require('../github')
    expect(getCredentials()).toEqual({ installed: { client_id: '123', project_id: '123', auth_uri: 'https://accounts.google.com/o/oauth2/auth', token_uri: 'https://oauth2.googleapis.com/token', auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs', client_secret: '123', redirect_uris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost'] } })
  })
  it('should throw error if no credentials are specified', () => {
    jest.mock('../constants', () => ({ DEFAULT_GOOGLE_CREDENTIALS: '' }))
    // eslint-disable-next-line global-require
    const { getCredentials } = require('../github')
    try {
      getCredentials()
    } catch (e) {
      expect(e.message).toEqual('Missing Credentials')
    }
  })
  it('should throw error if credentials is not JSON format ', () => {
    jest.mock('../constants', () => ({ DEFAULT_GOOGLE_CREDENTIALS: 'This has wrong format' }))
    // eslint-disable-next-line global-require
    const { getCredentials } = require('../github')
    try {
      getCredentials()
    } catch (e) {
      expect(e.message).toEqual('Failed to parse credentials: SyntaxError: Unexpected token T in JSON at position 0')
    }
  })
})

describe('getCalendarId', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return a calendar id', () => {
    jest.mock('../constants', () => ({ DEFAULT_CALENDAR_ID: 'primary' }))

    // eslint-disable-next-line global-require
    const { getCalendarId } = require('../github')
    expect(getCalendarId()).toEqual('primary')
  })
})

describe('getCustomCalendarBusyMessage', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return a Custom Calendar Busy Message', () => {
    jest.mock('../constants', () => ({ DEFAULT_CUSTOM_CALENDAR_BUSY_MESSAGE: 'Busy' }))

    // eslint-disable-next-line global-require
    const { getCustomCalendarBusyMessage } = require('../github')
    expect(getCustomCalendarBusyMessage()).toEqual('Busy')
  })
})

describe('getCustomCalendarNotBusyMessage', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should return a Custom Calendar Not Busy Message', () => {
    jest.mock('../constants', () => ({ DEFAULT_CUSTOM_CALENDAR_NOT_BUSY_MESSAGE: 'Not Busy' }))

    // eslint-disable-next-line global-require
    const { getCustomCalendarNotBusyMessage } = require('../github')
    expect(getCustomCalendarNotBusyMessage()).toEqual('Not Busy')
  })
})

describe('throwGithubError', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should throw github error', () => {
    // eslint-disable-next-line global-require
    const { throwGithubError } = require('../github')
    // eslint-disable-next-line global-require
    const core = require('@actions/core')
    throwGithubError('message')
    expect(core.setFailed).toHaveBeenCalledWith('message')
  })
})

describe('setGithubOutput', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should set output', () => {
    // eslint-disable-next-line global-require
    const { setGithubOutput } = require('../github')
    // eslint-disable-next-line global-require
    const core = require('@actions/core')
    setGithubOutput(false)
    expect(core.setOutput).toHaveBeenCalledWith('calendar-busy', false)
  })
})
