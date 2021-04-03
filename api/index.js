'use strict';
const express = require('express');
const app = express();
const router = express.Router();
const server = require('http').createServer(app);
const port = process.env.PORT;
const apiPrefix = "/v1"

router.get(`${apiPrefix}/test`, function (req, res) {
    res.send({"ok": "123"});
})

app.use('/', router);

server.listen(port, () => console.log(`app listen ${port} port`));