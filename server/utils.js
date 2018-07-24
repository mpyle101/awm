
const ObjectID = require('mongodb').ObjectID
const Result   = require('folktale/result')

module.exports.to_oid = v => new ObjectID(v)

module.exports._try = fn => {
    try {
        return fn()
            .then(data => Result.Ok(data))
            .catch(err => Result.Error(err))
    } catch (err) {
        return Promise.resolve(Result.Error(err))
    }
}
