var AWS = require('aws-sdk');
var Promise = require('bluebird');

var utils = require('./utils')

var db = new AWS.DynamoDB.DocumentClient()
Promise.promisifyAll( db )

var exports = {}

exports.put = function( table, item ) {
    item = utils.removeEmpty( item )
    var params = {
        TableName: table,
        Item: item
    }

    return  db.putAsync( params )
}

exports.delete = function( table, key ) {
    var params = {
        TableName: table,
        Key: key
    }

    return  db.deleteAsync( params )
}

exports.get = function(table, key) {
    var params = {
        TableName: table,
        Key: key
    }

    return new Promise(function (resolve, reject) {
        db.getAsync(params).then(function (result) {
            resolve(result.Item)
        }, reject)
    })
}

exports.scan = function( params ) {
    return  db.scanAsync( params )
}

exports.query = function( params ) {
    return new Promise(function (resolve, reject) {
        db.queryAsync( params ).then(function (result) {
            resolve(result.Items)
        }, reject)
    })
}

module.exports = exports;