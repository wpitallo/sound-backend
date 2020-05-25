const esmImport = require("esm")(module /*, options*/ )
process.env.ENVIRONMENT = 'test'
require('@wpitallo/global/env/load')

const Config = esmImport(`../_configuration/configuration.js`).default
const Global = esmImport('@wpitallo/global/index.js').default
const routes = esmImport("./routes/routes.js").default
console.log('function app - starting')
const version = 'v1'

module.exports = Global.createHandler(Global.functionApp.start("sound-backend", "frameworkTests", routes, Global, Config, version))
