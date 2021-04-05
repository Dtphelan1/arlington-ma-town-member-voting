// const DataRepository = require('DataRepository')

const dataAccessObjectBuilder = require('./DataRepository.js');
const accessLogger = require('./AccessLogger.js')

module.exports = { dataAccessObjectBuilder, AccessLogger: accessLogger };
