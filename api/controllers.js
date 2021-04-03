'use strict';

const dataAccessObjectBuilder = require('./dao');
const dao = dataAccessObjectBuilder();
const apiPrefix = '/v1'

function setupRoutes(app) {
    app.get(`${apiPrefix}/representatives`, function (req, res) {
        const precincts = req.query.precincts.split(',');
        return res.send(precincts);
    })

    app.get(`${apiPrefix}/articles`, function (req, res) {
        const articles = dao.getArticles();
        const result = articles.map(article => ({
            id: article.id,
            title: article.title,
            amendments: article.amendments && article.amendments.map(amendment => ({
                id: amendment.id,
                name: amendment.comment,
            }))
            // TODO: voting date
        }))

        return res.send(result);
    })
}

module.exports = setupRoutes;