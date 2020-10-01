const esmImport = require("esm")(module /*, options*/ )
process.env.ENVIRONMENT = 'test'
require('@wpitallo/globalServer/core/loadEnvFile')

const Config = esmImport(`../_configuration/configuration.js`).default
const Global = esmImport('@wpitallo/globalServer/index.js').default
const routes = esmImport("./routes/routes.js").default
console.log('function app - starting')
const version = 'v1'

module.exports = Global.createHandler(Global.functionApp.start("sound-backend", "frameworkTests", routes, Global, Config, version))
