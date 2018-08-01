
const express = require('express')
const qpm     = require('query-params-mongo')

const { _try, to_oid } = require('./utils')

module.exports = db => {

    const parseq = qpm()
    const router = express.Router()


    /**
     * Process an HTTP Range header.
     *   Range: items=0-5   # get the first 6 items
     *   Range: items=5-    # get the items from 6 on (subject to limit)
     */
    const process = (req, sort) => {
        const q = parseq(req.query)
        if (q.sort == undefined) {
            q.sort = sort
        }

        let status = 200
        q.limit  = 1000
        q.offset = 0

        const range = req.get('Range')
        if (range) {
            status = 206
            const [unit, items] = range.split('=')
            const [start, end]  = items.split('-')
            q.offset = parseInt(start, 10)
            if (end != '') {
                q.limit = parseInt(end, 10) - start + 1
            }
        }

        return {status, q}
    }


    const send = (res, status, items, offset, total) => {
        const end = offset + items.length - 1
        res.set({
            'Accept-Ranges': 'items',
            'Content-Range': `items ${offset}-${end}/${total}`
        })
        res.status(status).json(items)        
    }


    const find = async (cname, sort, req, res, next) => {
        const {status, q} = process(req, sort)
        const coll    = db.collection(cname)
        const options = {limit: q.limit, skip: q.offset, sort: q.sort}

        let total  = 0
        let result = await _try(() => coll.countDocuments(q.filter))
        result.matchWith({
            Ok:    ({value}) => total = value,
            Error: ({value}) => next({message: 'Internal error', error: value})
        })

        result = await _try(() => coll.find(q.filter, options).toArray())
        result.matchWith({
            Ok:    ({value}) => send(res, status, value, q.offset, total),
            Error: ({value}) => next({message: 'Internal error', error: value})
        })
    }


    const findOne = async (cname, req, res, next) => {
        const coll   = db.collection(cname)
        const result = await _try(() => coll.findOne({_id:to_oid(req.params.id)}))
        result.matchWith({
            Ok:    ({value}) => value ? res.send(value) : next({status: 404}),
            Error: ({value}) => next({message: 'Not found', error: value})
        })
    }


    const insert = async (cname, doc, res, next) => {
        const coll = db.collection(cname)
        const result = await _try(() => coll.insertOne(doc))
        result.matchWith({
            Ok:    ({value}) => {doc._id = value.insertedId; res.status(201).send(doc)},
            Error: ({value}) => next({message: 'Internal error', error: value})
        })
    }


    const update = async (cname, req, res, next) => {
        const doc  = req.body
        const coll = db.collection(cname)
        const doc_id = to_oid(req.params.id)

        let result = await _try(() => coll.findOne({_id:doc_id}))
        result.matchWith({
            Ok:    ({value}) => {if (! value) { next({status: 404}) }},
            Error: ({value}) => next({message: 'Not found', error: value})
        })

        result = await _try(() => coll.update({_id:doc_id}, doc))
        result.matchWith({
            Ok:    ({value}) => value ? res.send(doc) : next({status: 404}),
            Error: ({value}) => next({message: 'Internal error', error: value})
        })
    }


    router.get('/', (req, res) => {
        res.send('api works')
    })

    router.route('/cycles')
        .get((req, res, next)  => find('cycles', {'start': -1}, req, res, next))
        .post((req, res, next) => insert('cycles', req, res, next))

    router.route('/cycles/:id')
        .get((req, res, next) => findOne('cycles', req, res, next))
        .put((req, res, next) => update('cycles', req, res, next))

    router.route('/exercises')
        .get((req, res, next)  => find('exercises', {'name': -1}, req, res, next))
        .post((req, res, next) => insert('exercises', req.body, res, next))

    router.route('/exercises/:id')
        .get((req, res, next) => findOne('exercises', req, res, next))
        .put((req, res, next) => update('exercises', req, res, next))

    router.route('/workouts')
        .get((req, res, next)  => find('workouts', {'date':-1}, req, res, next))
        .post((req, res, next) => insert('workouts', req.body, res, next))

    router.route('/workouts/:id')
        .get((req, res, next) => findOne('workouts', req, res, next))
        .put((req, res, next) => update('workouts', req, res, next))


    return router
}
