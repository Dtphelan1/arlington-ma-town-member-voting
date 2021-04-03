const fs = require('fs');

class FileBackedDataRepository {
  constructor(articleFilePath, votes2020_11_16FilePath) {
    this.articleData = JSON.parse(fs.readFileSync("../data/articles/articles.json"))
    // this.voteData = JSON.parse(fs.readFileSync(votes2020_11_16FilePath))
  }

  /**
   * @param precinct The string name of the precinct we're interested in, or omit for all precincts
   * @return A map of precinct string name to array of representative names
   */
  getRepresentativesByPrecinct(precinct = null) {
    let intermediate = {}
    this.voteData.forEach(voteRecord => {
      if (precinct == null || voteRecord.precinct === precinct) {
        if (voteRecord.precinct in intermediate) {
          intermediate[voteRecord.precinct].add(voteRecord.representativeFullName)
        } else {
          intermediate[voteRecord.precinct] = new Set([voteRecord.representativeFullName])
        }
      }
    })

    let result = {}
    Object.entries(intermediate).forEach(pair => {
      result[pair[0]] = Array.from(pair[1])
    })
    return result
  }

  /**
   * @param precinct The string name of the precinct we're interested in, or omit for all precincts
   * @return A map of representative name to (articleId, vote) tuples. Note that there's no distinction
   * between representatives from different precincts, if `null` is passed into this function
   */
  getVotingRecordByPrecinct(precinct = null) {
    const representativeNameToVotes = {}
    this.voteData
      .filter(record => precinct == null || record.precinct === precinct)
      .forEach(record => {
        if (record.representativeFullName in representativeNameToVotes) {
          representativeNameToVotes[record.representativeFullName].append(record.votes)
        } else {
          representativeNameToVotes[record.representativeFullName] = [...record.votes]
        }
      })

    return representativeNameToVotes
  }

  /**
   * @return An array of articles that have been voted on in this data set and the ID we have given it
   */
  getArticleOptions() {
    return this.articleData;
  }
}

module.exports = function () {
  return new FileBackedDataRepository();
};
