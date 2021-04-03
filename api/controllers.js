'use strict';

const dataAccessObjectBuilder = require('./dao');
const dao = dataAccessObjectBuilder();
const apiPrefix = '/v1'

function setupRoutes(app) {
    function getPrecinctsQueryParam(req) {
        const precincts = req.query.precincts && req.query.precincts.split(',');
        if (precincts == null || precincts.length === 0) {
            return [];
        }

        return precincts;
    }
    app.get(`${apiPrefix}/representatives`, function (req, res) {
        const precincts = getPrecinctsQueryParam(req);
        if (precincts.length === 0) {
            return res.send(dao.getRepresentatives());
        } else {
            const result = [];
            precincts.forEach(precinct => {
                result.push(...dao.getRepresentatives(precinct))
            })

            return res.send(result);
        }
    })

    app.get(`${apiPrefix}/representatives/history`, function (req, res) {
        const precincts = getPrecinctsQueryParam(req);
        if (precincts.length === 0) {

        } else {
            const result = [];

            const articles = dao.getArticles();
            const articleIds = new Set(articles.map(a => a.id))
            const amendmentIdToArticle = {}
            articles.forEach(article => {
                article.amendments && article.amendments.forEach(amendmentData => {
                    amendmentIdToArticle[amendmentData.id] = article;
                })
            })

            // const articleIds = new Set(articles.map(a => a.id))
            // console.log(articles.map(a => a.amendments))
            // const amendmentIds = new Set(articles
            //     .map(a => a.amendments)
            //     .filter(a => a != null)
            //     .flatMap(amendments => amendments.map(a => a.id))
            // )
            const representatives = dao.getRepresentatives();
            precincts.forEach(precinct => {
                const representativeNameToVotes = dao.getVotingRecordByPrecinct(precinct);
                Object.keys(representativeNameToVotes).forEach(memberName => {
                    const representativeData = representatives.find(r => r.fullName === memberName);
                    const voteHistory = {
                        representative: {
                            fullName: memberName,
                            precinct: representativeData.precinct,
                        },
                        votes: [],
                    }

                    representativeNameToVotes[memberName].forEach(voteRecord => {
                        const isArticle = articleIds.has(voteRecord.articleId);
                        const isAmendment = voteRecord.articleId in amendmentIdToArticle;

                        if (isArticle) {
                            const article = articles.find(a => a.id === voteRecord.articleId);
                            voteHistory.votes.push({
                                article: {
                                    id: voteRecord.articleId,
                                    title: article.title,
                                },
                                vote: voteRecord.vote.trim(),
                                infoUrl: article.urls && (article.urls.menotomyMatters || article.urls.arlingtonGov)
                            })
                        }
                    })

                    result.push(voteHistory)
                })
            })

            res.send(result);
        }
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