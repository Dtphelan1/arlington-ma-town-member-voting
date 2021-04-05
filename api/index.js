'use strict';
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const setupRoutes = require('./controllers');
const { AccessLogger } = require('./dao')

dotenv.config();

const port = process.env.PORT;

// redirect http to https
app.use(function(req, res, next) {
    const isDev = process.env.IS_DEV && process.env.is_DEV !== "";
    if (isDev || req.headers['x-forwarded-proto'] === 'https') {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
})

// set up access logging
if (process.env.DATABASE_URL) {
    const accessLogger = new AccessLogger(process.env.DATABASE_URL);
    app.use(function (req, res, next) {
        console.log(req.url)
        accessLogger.log(req.headers['X-Forwarded-For'], req.query.precincts);
        next();
    })
}
// access logging
app.use(function(req, res, next) {

    next();
})
app.use(cors());
app.use(express.json());

setupRoutes(app);

app.use(express.static('public'));

server.listen(port, () => console.log(`app listen ${port} port`));
