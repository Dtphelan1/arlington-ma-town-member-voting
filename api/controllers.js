'use strict';

const router = require('express').Router();
const dataAccessObjectBuilder = require('./dao');
const dao = dataAccessObjectBuilder();
const apiPrefix = '/v1'

router.get(`${apiPrefix}/articles`, function (req, res) {
    const articles = dao.getArticleOptions();
    console.log("getting articles")
    const result = articles.map(article => {
        console.log(article)
    return {
        id: article.id,
        title: article.title,
        amendments: article.amendments && article.amendments.map(amendment => ({
            id: amendment.id,
            name: amendment.comment,
        }))
    }})

    // TODO: voting date
    return res.send(result);
})
module.exports = router;