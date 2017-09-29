var AWS = require('aws-sdk')
var Promise = require('bluebird')

var ses = new AWS.SES({apiVersion: '2010-12-01'})
Promise.promisifyAll( ses )

var exports = {}

var overwrite = process.env.EMAIL_OVERWRITE

exports.send = function( _from, to, bcc, replyTo, subject, body ) {
    var params = {
        Destination: {
            BccAddresses: [
                bcc
            ],
            ToAddresses: [
                to
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: body
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject
            }
        },
        ReplyToAddresses: [
            replyTo
        ],
        Source: _from
    };

    if (overwrite) params.Destination = { ToAddresses: [ overwrite ] }

    return ses.sendEmailAsync(params)
}

module.exports = exports