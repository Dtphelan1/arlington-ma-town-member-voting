'use strict';

const axios = require('axios');
const { dataAccessObjectBuilder } = require('./dao');
const dao = dataAccessObjectBuilder();
const apiPrefix = '/api/v1';

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
        result.push(...dao.getRepresentatives(precinct));
      });

      return res.send(result);
    }
  });

  app.get(`${apiPrefix}/representatives/history`, function (req, res) {
    const precincts = getPrecinctsQueryParam(req);
    if (precincts.length === 0) {
      precincts.push(...Array.from(new Set(dao.getRepresentatives().map(rep => rep.precinct))));
    }

    const result = [];

    const articles = dao.getArticles();
    const articleIds = new Set(articles.map(a => a.id));

    const representatives = dao.getRepresentatives();
    precincts.forEach(precinct => {
      const representativeNameToVotes = dao.getVotingRecordByPrecinct(precinct);
      Object.keys(representativeNameToVotes).forEach(memberName => {
        const representativeData = representatives.find(r => r.fullName === memberName);
        const voteHistory = {
          representative: {
            fullName: memberName,
            precinct: representativeData.precinct,
            reelection: representativeData.reelection
          },
          votes: []
        };

        representativeNameToVotes[memberName].forEach(voteRecord => {
          const isArticle = articleIds.has(voteRecord.articleId);

          // The data is structured on-disk with amendment votes being at the same level,
          // in terms of entities, as articles. This could arguably be cleaned up in the data
          // but speed wins
          if (isArticle) {
            const article = articles.find(a => a.id === voteRecord.articleId);
            voteHistory.votes.push({
              article: {
                id: voteRecord.articleId,
                title: article.title,
                amendments:
                  article.amendments &&
                  article.amendments.map(a => ({
                    id: a.id,
                    name: a.comment
                  }))
              },
              vote: voteRecord.vote.trim(),
              infoUrl: article.urls && (article.urls.menotomyMatters || article.urls.arlingtonGov),
              amendmentVotes:
                article.amendments &&
                article.amendments
                  .map(amendment => {
                    const amendmentVote = representativeNameToVotes[memberName].find(
                      voteable => voteable.articleId === amendment.id
                    );

                    // We may encounter this if the public voting data does not include votes for some amendments
                    // An example is the 2020 ranked choice voting article which had three amendments but none of those votes
                    // show up in the public vote data.
                    if (amendmentVote == null) {
                      // console.log(memberName, "\n", voteRecord, "\n", amendment, "\n", representativeNameToVotes[memberName])
                      return null;
                    }
                    return {
                      amendmentId: amendment.id,
                      vote: amendmentVote.vote.trim()
                    };
                  })
                  .filter(o => o != null)
            });
          }
        });

        result.push(voteHistory);
      });
    });

    return res.send(result);
  });

  app.get(`${apiPrefix}/articles`, function (req, res) {
    const articles = dao.getArticles();
    const result = articles.map(article => ({
      id: article.id,
      title: article.title,
      amendments:
        article.amendments &&
        article.amendments.map(amendment => ({
          id: amendment.id,
          name: amendment.comment
        }))
    }));

    return res.send(result);
  });

  app.get(`${apiPrefix}/article/:id`, function (req, res) {
    const article = dao.getArticleById(req.params.id);
    return res.json(article);
  });

  app.post(`${apiPrefix}/share`, async (req, res) => {
    const response = await axios.post(
      'https://api-ssl.bitly.com/v4/shorten',
      {
        long_url: req.body.longUrl
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BITLY_API_KEY}`
        }
      }
    );

    return res.json(response.data);
  });
}

module.exports = setupRoutes;
