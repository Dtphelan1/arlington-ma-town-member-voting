const fs = require("fs");
const path = require("path");
const { v5 } = require("uuid");
const articles = JSON.parse(
  fs.readFileSync("./extracted-articles-metadata.json")
);
const tmmVotes = JSON.parse(fs.readFileSync("./extracted-tmm-votes.json"));

// Namespace for ID generation based on article name
const NAMESPACE = "835fe87c-2a0f-4c6c-aae5-152c38e8108e";

// Add id to articles
articles.forEach((article) => {
  article.id = v5(article.article, NAMESPACE);
});

// Add ids to memberVotes
tmmVotes.forEach((tmmData) => {
  tmmData.votes.forEach((article) => {
    article.id = v5(article.articleName, NAMESPACE);
  });
});

// Update articles
fs.writeFileSync(
  path.resolve(__dirname, "articles-with-ids.json"),
  JSON.stringify(articles, null, 4)
);

// update tmmVotes
fs.writeFileSync(
  path.resolve(__dirname, "tmm-votes-with-ids.json"),
  JSON.stringify(tmmVotes, null, 4)
);
