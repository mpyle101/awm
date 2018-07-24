
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
    const process = req => {
        const q = parseq(req.query)
        if (q.sort == undefined) {
            q.sort = {'date': -1}
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


    router.get('/', (req, res) => {
        res.send('api works')
    })


    router.get('/workouts', async (req, res, next) => {
        const {status, q} = process(req)
        const coll = db.collection('workouts')
        const options = {limit: q.limit, skip: q.offset, sort: q.sort}

        let total = 0
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
    })


    router.get('/workouts/:id', async (req, res, next) => {
        const coll = db.collection('workouts')
        const result = await _try(() => coll.findOne({_id:to_oid(req.params.id)}))

        result.matchWith({
            Ok:    ({value}) => value ? res.send(value) : next({status: 404}),
            Error: ({value}) => next({message: 'Not found', error: value})
        })
    })


    return router
}