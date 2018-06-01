var assert = require('chai').assert
var sinon = require('sinon')
var importFresh = require("import-fresh")

describe('ses', function() {
    describe('send', function() {
        it('emailOverwrite from config', done => {
            process.env["NODE_CONFIG_DIR"] = "test/resources/config"
            process.env["NODE_APP_INSTANCE"] = "overwrite"

            importFresh("config")

            var sesWrapper = require('../../src/wrappers/sesWrapper')
            var ses = require('../../src/ses')

            var sendEmailAsync = sinon.stub(sesWrapper, "sendEmailAsync")
            sendEmailAsync.callsFake(params => {
                assert.notExists(params.Destination.BccAddresses)
                assert.equal(params.Destination.ToAddresses.length, 1)
                assert.include(params.Destination.ToAddresses, 'overwrite@config.com')
                return Promise.resolve('mailId')
            })

            ses.send('from@test.com', ['real@test.com'], ['bcc@test.com'], 'replyTo@teste.com', 'Subject', 'Body').then(() => {
                delete process.env["NODE_CONFIG_DIR"]
                sendEmailAsync.restore()
                done()
            })
        })

        it('emailOverwrite from env', done => {
            process.env["NODE_CONFIG_DIR"] = "test/resources/config"
            process.env["NODE_APP_INSTANCE"] = "overwrite"
            process.env["EMAIL_OVERWRITE"] = "overwrite@env.com"

            importFresh("config")

            var sesWrapper = require('../../src/wrappers/sesWrapper')
            var ses = require('../../src/ses')

            var sendEmailAsync = sinon.stub(sesWrapper, "sendEmailAsync")
            sendEmailAsync.callsFake(params => {
                assert.notExists(params.Destination.BccAddresses)
                assert.equal(params.Destination.ToAddresses.length, 1)
                assert.include(params.Destination.ToAddresses, 'overwrite@env.com')
                return Promise.resolve('mailId')
            })

            ses.send('from@test.com', ['real@test.com'], ['bcc@test.com'], 'replyTo@teste.com', 'Subject', 'Body').then(() => {
                delete process.env["NODE_CONFIG_DIR"]
                delete process.env["EMAIL_OVERWRITE"]
                sendEmailAsync.restore()
                done()
            })
        })

        it('no emailOverwrite from env', done => {
            process.env["NODE_CONFIG_DIR"] = "test/resources/config"
            process.env["NODE_APP_INSTANCE"] = "noOverwrite"

            importFresh("config")

            var sesWrapper = require('../../src/wrappers/sesWrapper')
            var ses = require('../../src/ses')

            var sendEmailAsync = sinon.stub(sesWrapper, "sendEmailAsync")
            sendEmailAsync.callsFake(params => {
                assert.equal(params.Destination.BccAddresses.length, 1)
                assert.include(params.Destination.BccAddresses, 'bcc@test.com')
                assert.equal(params.Destination.ToAddresses.length, 1)
                assert.include(params.Destination.ToAddresses, 'real@test.com')
                return Promise.resolve('mailId')
            })

            ses.send('from@test.com', ['real@test.com'], ['bcc@test.com'], 'replyTo@teste.com', 'Subject', 'Body').then(() => {
                delete process.env["NODE_CONFIG_DIR"]
                sendEmailAsync.restore()
                done()
            })
        })
    })
})
