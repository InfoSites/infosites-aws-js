var exports = {}

exports.removeEmpty = function(obj) {
    Object.keys(obj).forEach(function(key) {
        if (obj[key] && typeof obj[key] === 'object') exports.removeEmpty(obj[key])
        else if (obj[key] === null || obj[key] === undefined || obj[key] === '') delete obj[key]
    })
    return obj
}

module.exports = exports;