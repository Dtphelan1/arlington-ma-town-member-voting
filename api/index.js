'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const port = process.env.PORT;
const setupRoutes = require('./controllers')

app.use(cors());
setupRoutes(app);

app.use(express.static('public'))

server.listen(port, () => console.log(`app listen ${port} port`));