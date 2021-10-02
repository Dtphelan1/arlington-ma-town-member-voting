const fs = require("fs");
const path = require("path");
const { v5 } = require("uuid");
// Data to load
const articles = JSON.parse(
  fs.readFileSync("./extracted-articles-metadata.json")
);
const mmArticles = JSON.parse(
  fs.readFileSync("./MM-articles-with-number.json")
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

// Using various videoURLRegexp, identify a candidate video URL on a MMArticle object
// return null if none is found
function identifyVideoInSupplements(article) {
  const patterns = [
    new RegExp("Explanatory video from the town"),
    new RegExp("Explanatory ACMI TV Video"),
  ];

  if (!article.supplements) return null;
  return article.supplements.find((supplement) => {
    return patterns.reduce(
      (hasVideo, currentPattern) =>
        hasVideo || currentPattern.test(supplement.comment),
      false
    );
  });
}

// Remove unnecessary MM atributes up combined articles:
function mmArticlesProcessing(mmArticles) {
  const attrToDelete = [
    "insertby",
    "inserturl",
    "type",
    "related",
    "board",
    "noaction",
    "recommend",
  ];
  mmArticles.forEach((article) => {
    attrToDelete.forEach((attr) => delete article[attr]);
    const videoSupplement = identifyVideoInSupplements(article);
    if (!videoSupplement) {
      article.video = null;
    } else {
      const urlRegex = new RegExp("http");
      const videoUrl =
        Object.keys(videoSupplement).find((key) => urlRegex.test(key)) || null;
      article.video = videoUrl;
    }
  });
}

mmArticlesProcessing(mmArticles);

// Combine mmArticles and articles based on articleNumber
const combinedArticles = [];
if (mmArticles.length > articles.length) {
  mmArticles.forEach((curArticle) => {
    const curArticleNumber = curArticle.articleNumber;
    const matchedArticle = articles.find(
      (article) => article.articleNumber === curArticleNumber
    );
    if (matchedArticle) {
      const combinedArticle = {
        ...curArticle,
        ...matchedArticle,
        // These properties should always be based on the TMM CSV, not MM
        id: matchedArticle.id,
        article: matchedArticle.article,
        // These Properties should always be based on the MM data, not TMM CSV
      };
      combinedArticles.push(combinedArticle);
    } else {
      console.error(
        `Iterating over mmArticles, could not find matching article with number ${curArticleNumber} in articles`
      );
    }
  });
} else {
  articles.forEach((curArticle) => {
    const curArticleNumber = curArticle.articleNumber;
    const matchedArticle = mmArticles.find(
      (article) => article.articleNumber === curArticleNumber
    );
    if (matchedArticle) {
      const combinedArticle = {
        ...curArticle,
        ...matchedArticle,
        // These properties should always be based on the TMM CSV, not MM
        id: curArticle.id,
        article: curArticle.article,
        // These Properties should always be based on the MM data, not TMM CSV
      };
      combinedArticles.push(combinedArticle);
    } else {
      console.error(
        `Iterating over articles, could not find matching article with number ${curArticleNumber} in mmArticles`
      );
    }
  });
}

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

// write combined file to disk
fs.writeFileSync(
  path.resolve(__dirname, "combined-articles.json"),
  JSON.stringify(combinedArticles, null, 4)
);
