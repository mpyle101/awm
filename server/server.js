
const body_parser = require('body-parser')
const express = require('express')
const http    = require('http')
const mongo   = require('mongodb')
const path    = require('path')

const { _try } = require('./utils')


const app = express()
const server = http.createServer(app)

// Parsers for POST data
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: false}))

// Point static path to public
app.use(express.static(path.join(__dirname, '../public')))

// Shutdown handling
let mongo_client
const shutdown = () => {
    if (mongo_client) {
        console.log('Closing database connection')
        mongo_client.close()
    }
    console.log('Shutting down')
    server.close()
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT  || '9000'
const url  = process.env.MONGO || 'mongodb://localhost:27017';

(async () => {
    const result = await _try(() => mongo.connect(url, {useNewUrlParser: true}))
    result.fold(
        err => console.log(`Failed to connect to Mongo: ${err}`),
        client => {
            console.log('Connected to Mongo')
            mongo_client = client
            const db = client.db('awm')

            // Set our api routes
            const router = require('./routes')(db)
            app.use('/api', router)

            // Catch all other routes and return the index file
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, '../public/index.html'))
            })

            app.use((err, req, res, next) => {
                res.status(err.status || 500)
                if (err.status == 404) {
                    res.send('Not found')
                } else {
                    res.json({
                        message: err.message,
                        error: err.error.toString()
                    })
                }
            })

            // Listen on provided port, on all network interfaces.
            server.listen(port, () => console.log(`Server running on localhost:${port}`)) 
        }
    )
})()
