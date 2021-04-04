'use strict';
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const setupRoutes = require('./controllers');

dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

setupRoutes(app);

app.use(express.static('public'));

server.listen(port, () => console.log(`app listen ${port} port`));
