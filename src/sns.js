var AWS = require('aws-sdk')

var sns = new AWS.SNS( { apiVersion: '2010-03-31' } )

var exports = {}

exports.publish = function( topic, payload ) {
    var params = {
        TopicArn: topic,
        Message: JSON.stringify(payload)
    }

    return sns.publish( params ).promise()
}

module.exports = exports