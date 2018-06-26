const signale = require('signale')

exports.reType = function(obj) {
  return Object.prototype.toString.call(obj)
}

signale.config({
  displayFilename: true,
  displayTimestamp: true,
  displayDate: true
})

exports.print = signale