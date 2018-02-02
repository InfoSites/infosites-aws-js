'use strict'

var AWS = require('aws-sdk')
var Promise = require('bluebird')

var s3 = new AWS.S3({
    signatureVersion: 'v4'
});
Promise.promisifyAll( s3 );

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

    return s3.getObjectAsync(params)
}

exports.putJson = function (bucket, key, json) {
    var params = {
        Bucket: bucket,
        Key:  key,
        Body: JSON.stringify(json),
        ContentType: 'application/json',
        ACL: 'public-read'
    }

    return s3.putObjectAsync(params)
}

exports.putFile = function (bucket, key, file, contentType) {
    var params = {
        Bucket: bucket,
        Key:  key,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read'
    }

    return s3.putObjectAsync(params)
}

module.exports = exports;