
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-chakra-ui-datepicker.cjs.production.min.js')
} else {
  module.exports = require('./react-chakra-ui-datepicker.cjs.development.js')
}
