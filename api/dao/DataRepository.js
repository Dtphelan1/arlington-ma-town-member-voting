const fs = require('fs');

class FileBackedDataRepository {
  constructor() {
    this.articleData = JSON.parse(fs.readFileSync('./dao/articles.json'));
    this.representativeVotes = JSON.parse(fs.readFileSync('./dao/representative-votes.json'));
  }

  getRepresentatives(precinct = null) {
    const seenRepresentatives = new Set();
    const representatives = [];
    this.representativeVotes.forEach(voteRecord => {
      if (
        seenRepresentatives.has(voteRecord.representativeFullName) ||
        (precinct != null && voteRecord.precinct !== precinct)
      ) {
        return;
      }

      representatives.push({
        fullName: voteRecord.representativeFullName,
        precinct: voteRecord.precinct
      });
      seenRepresentatives.add(voteRecord.representativeFullName);
    });

    return representatives;
  }

  /**
   * @param precinct The string name of the precinct we're interested in, or omit for all precincts
   * @return A map of representative name to (articleId, vote) tuples. Note that there's no distinction
   * between representatives from different precincts, if `null` is passed into this function
   */
  getVotingRecordByPrecinct(precinct = null) {
    const representativeNameToVotes = {};
    this.representativeVotes
      .filter(record => precinct == null || record.precinct === precinct)
      .forEach(record => {
        if (record.representativeFullName in representativeNameToVotes) {
          representativeNameToVotes[record.representativeFullName].push(...record.votes);
        } else {
          representativeNameToVotes[record.representativeFullName] = [...record.votes];
        }
      });

    return representativeNameToVotes;
  }

  /**
   * @return An array of articles that have been voted on in this data set and the ID we have given it
   */
  getArticles() {
    return this.articleData;
  }
}

module.exports = function () {
  return new FileBackedDataRepository();
};
