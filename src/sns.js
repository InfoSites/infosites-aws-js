var AWS = require('aws-sdk')
var Promise = require('bluebird')

var sns = new AWS.SNS( { apiVersion: '2010-03-31' } )
Promise.promisifyAll( sns )

var exports = {}

exports.publish = function( topic, payload ) {
    var params = {
        TopicArn: topic,
        Message: JSON.stringify(payload)
    }

    return sns.publishAsync( params )
}

module.exports = exports