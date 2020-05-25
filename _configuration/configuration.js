//mport Helpers from '@wpitallo/global/helpers'

let configuration = {}

// Helpers.logger.system(`-------------------------------------------------------------------`)
// Helpers.logger.system(`----------------- Configuration Loaded ----------------------------`)
// Helpers.logger.system(`-------------------------------------------------------------------`)

process.env.PROJECT = "sound-backend"

const loggerConfig = {
  testSuccess: false,
  testPackageSuccess: true,
  testSuiteSuccess: true,
  headers: false,
  error: false,
  provisionError: true,
  success: false,
  modelValidationError: false,
  modelValidationSuccess: false,
  warn: false,
  env: false,
  system: false,
  log: false,
  info: false,
  trace: false,
  diagnostic: false,
  database: true,
  azureLogger: false
}

process.env.LOGGERCONFIG = JSON.stringify(loggerConfig)


// Helpers.logger.system(`process.env.PROJECT:` + process.env.PROJECT)
// Helpers.logger.system(`process.env.TEST_SERVER_LOCAL:` + process.env.TEST_SERVER_LOCAL)
// Helpers.logger.system(`process.env.AUTHENTICATION_SERVER_KEY:` + process.env.AUTHENTICATION_SERVER_KEY)
// Helpers.logger.system(`process.env.TEST_SYSTEM_KEY:` + process.env.TEST_SYSTEM_KEY)
// Helpers.logger.system(`process.env.IOPORT:` + process.env.IOPORT)
// Helpers.logger.system(`process.env.HOST:` + process.env.HOST)
// Helpers.logger.system(`process.env.SERVERPORT:` + process.env.SERVERPORT)

const version = 'v1'
configuration.swaggerEnabled = process.env.SWAGGER_ENABLED
configuration.api = [{
  systemKey: 'playCoin',
  environment: process.env.ENVIRONMENT,
  entityKeys: ['exchangeService'],
  version: version,
  endpoint: process.env.API_ENDPOINT_PLAYCOIN, // 'http://18.188.176.181:7071/api/v1/', //'https://blackqubit-functions.azurewebsites.net/api/v1/',
  logoutUrl: process.env.APILOGOUTURL_PLAYCOIN,
  logging: true
}]

configuration.sqlClient = [{
  systemKey: 'playCoin',
  environment: process.env.ENVIRONMENT,
  user: process.env.SQLCLIENT_USER_PLAYCOIN,
  password: process.env.SQLCLIENT_PASSWORD_PLAYCOIN,
  server: process.env.SQLCLIENT_SERVER_PLAYCOIN, // You can use 'localhost\\instance' to connect to named instance
  database: process.env.SQLCLIENT_DATABASE_PLAYCOIN,
  connectionTimeout: Number(process.env.SQLCLIENT_CONNECTION_TIMEOUT_PLAYCOIN),
  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
}]

configuration.cosmosClient = [{
  systemKey: 'playCoin',
  environment: process.env.ENVIRONMENT,
  entityKeys: ['exchangeService'],
  endpoint: process.env.COSMOSCLIENT_ENDPOINT_PLAYCOIN,
  authKey: process.env.COSMOSCLIENT_AUTHKEY_PLAYCOIN,
  databaseId: process.env.COSMOSCLIENT_DATABASEID_PLAYCOIN,
  containerId: process.env.COSMOSCLIENT_CONTAINERID_PLAYCOIN
}]

// so not sure why the others are required this is only for machine to machine authentication
configuration.authentication = [{
  systemKey: 'authentication',
  environment: process.env.ENVIRONMENT,
  jwksUri: process.env.AUTHENTICATION_JWKSURI_PLAYCOIN,
  audience: process.env.AUTHENTICATION_AUDIENCE_PLAYCOIN,
  issuer: process.env.AUTHENTICATION_ISSUER_PLAYCOIN,
  url: process.env.AUTHENTICATION_URL_PLAYCOIN,
  clientId: process.env.AUTHENTICATION_CLIENTID_PLAYCOIN,
  clientSecret: process.env.AUTHENTICATION_CLIENTSECRET_PLAYCOIN
}]

// so not sure why the others are required this is only for machine to machine authentication
configuration.machineToMachineAuthentication = [{
  systemKey: 'playCoin',
  environment: process.env.ENVIRONMENT,
  jwksUri: process.env.AUTHENTICATION_MACHINE_JWKSURI_PLAYCOIN,
  audience: process.env.AUTHENTICATION_MACHINE_AUDIENCE_PLAYCOIN,
  issuer: process.env.AUTHENTICATION_MACHINE_ISSUER_PLAYCOIN,
  url: process.env.AUTHENTICATION_MACHINE_URL_PLAYCOIN,
  clientId: process.env.AUTHENTICATION_MACHINE_CLIENTID_PLAYCOIN,
  clientSecret: process.env.AUTHENTICATION_MACHINE_CLIENTSECRET_PLAYCOIN
}]
configuration.blobStorage = [{
  systemKey: 'playCoin',
  environment: process.env.ENVIRONMENT,
  accountName: process.env.BLOBSTORAGE_ACCOUNTNAME_PLAYCOIN,
  accountKey: process.env.BLOBSTORAGE_ACCOUNTKEY_PLAYCOIN,
  containerName: process.env.BLOBSTORAGE_CONTAINERNAME_PLAYCOIN,
}]

if (loggerConfig.system) {
  console.log(configuration)
}


export default configuration
