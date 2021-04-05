'use strict';
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const setupRoutes = require('./controllers');

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
app.use(cors());
app.use(express.json());

setupRoutes(app);

app.use(express.static('public'));

server.listen(port, () => console.log(`app listen ${port} port`));
