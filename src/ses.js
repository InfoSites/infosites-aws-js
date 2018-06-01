var ses = require('./wrappers/sesWrapper')

var exports = {}

exports.send = function( _from, to, bcc, replyTo, subject, body ) {
    var config = require('config')

    var overwrite = process.env.EMAIL_OVERWRITE || (config.has('email.emailOverwrite') && config.get('email.emailOverwrite'))

    var params = {
        Destination: {
            BccAddresses: bcc,
            ToAddresses: to
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