var AWS = require('aws-sdk')

var ses = new AWS.SES({apiVersion: '2010-12-01'})

module.exports = ses