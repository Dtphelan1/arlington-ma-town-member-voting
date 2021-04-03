'use strict';
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT;
const router = require('./controllers')

app.use('/', router);

server.listen(port, () => console.log(`app listen ${port} port`));