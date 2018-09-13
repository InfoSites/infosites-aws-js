'use strict'

var AWS = require('aws-sdk')

var s3 = new AWS.S3({
    signatureVersion: 'v4'
});

var exports = {};

exports.getSignedUrl = function (bucket, key, contentType, contentLength) {
    var params = {
		Bucket: bucket,
        Key:  key,
        ContentType: contentType,
        ContentLength: contentLength,
        ACL: 'public-read'
    }

    return s3.getSignedUrl('putObject', params)
}

exports.getObject = function (bucket, key) {
    var params = {
        Bucket: bucket,
        Key:  key
    }

    return s3.getObject(params).promise()
}

exports.putJson = function (bucket, key, json) {
    var params = {
        Bucket: bucket,
        Key:  key,
        Body: JSON.stringify(json),
        ContentType: 'application/json',
        ACL: 'public-read'
    }

    return s3.putObject(params).promise()
}

exports.putFile = function (bucket, key, file, contentType) {
    var params = {
        Bucket: bucket,
        Key:  key,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read'
    }

    return s3.putObject(params).promise()
}

module.exports = exports;