
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
    const processRequest = (req, sort) => {
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


    const processDocument = (cname, doc) => {
        if (cname == 'workouts') {
            doc.date = new Date(doc.date)
        } else if (cname == 'cycles') {
            doc.start = new Date(doc.start)
            doc.end   = new Date(doc.end)
        }

        return doc
    }


    const send = (res, status, items, offset, total) => {
        const end = Math.max(0, offset + items.length - 1)
        res.set({
            'Accept-Ranges': 'items',
            'Content-Range': `items ${offset}-${end}/${total}`
        })
        res.status(status).json(items)        
    }


    const getall = async (cname, sort, req, res, next) => {
        const {status, q} = processRequest(req, sort)
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


    const getone = async (cname, req, res, next) => {
        const coll   = db.collection(cname)
        const result = await _try(() => coll.findOne({_id:to_oid(req.params.id)}))
        result.matchWith({
            Ok:    ({value}) => value ? res.send(value) : next({status: 404}),
            Error: ({value}) => next({message: 'Not found', error: value})
        })
    }


    const create = async (cname, req, res, next) => {
        const doc  = processDocument(cname, req.body)
        const coll = db.collection(cname)
        const result = await _try(() => coll.insertOne(doc))
        result.matchWith({
            Ok:    ({value}) => doc._id = value.insertedId,
            Error: ({value}) => next({message: 'Internal error', error: value})
        })

        res.set({'Location': `${req.protocol}://${req.get("host")}${req.originalUrl}/${doc._id}`})
        res.status(201).send(doc)
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
            Ok:    ({value}) => res.send(doc),
            Error: ({value}) => next({message: 'Internal error', error: value})
        })
    }


    const remove = async (cname, req, res, next) => {
        const coll = db.collection(cname)
        const doc_id = to_oid(req.params.id)

        let result = await _try(() => coll.deleteOne({_id:doc_id}))
        result.matchWith({
            Ok:    ({value}) => res.status(204).send(),
            Error: ({value}) => next({message: 'Internal error', error: value})
        })
    }


    router.get('/', (req, res) => {
        res.send('api works')
    })

    router.route('/cycles')
        .get((req, res, next) => getall('cycles', {'start': -1}, req, res, next))
        .post((req, res, next) => create('cycles', req, res, next))

    router.route('/cycles/:id')
        .get((req, res, next) => getone('cycles', req, res, next))
        .put((req, res, next) => update('cycles', req, res, next))
        .delete((req, res, next) => remove('cycles', req, res, next))

    router.route('/exercises')
        .get((req, res, next) => getall('exercises', {'name': 1}, req, res, next))
        .post((req, res, next) => create('exercises', req, res, next))

    router.route('/exercises/:id')
        .get((req, res, next) => getone('exercises', req, res, next))
        .put((req, res, next) => update('exercises', req, res, next))
        .delete((req, res, next) => remove('exercises', req, res, next))

    router.route('/workouts')
        .get((req, res, next) => getall('workouts', {'date':-1}, req, res, next))
        .post((req, res, next) => create('workouts', req, res, next))

    router.route('/workouts/:id')
        .get((req, res, next) => getone('workouts', req, res, next))
        .put((req, res, next) => update('workouts', req, res, next))
        .delete((req, res, next) => remove('workouts', req, res, next))


    return router
}
