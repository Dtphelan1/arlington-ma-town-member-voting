'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const port = process.env.PORT;
const setupRoutes = require('./controllers')

setupRoutes(app);

app.use(cors())

server.listen(port, () => console.log(`app listen ${port} port`));