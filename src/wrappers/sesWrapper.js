var AWS = require('aws-sdk')
var Promise = require('bluebird')

var ses = new AWS.SES({apiVersion: '2010-12-01'})
Promise.promisifyAll( ses )

module.exports = ses