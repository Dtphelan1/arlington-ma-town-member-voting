import articleData from './articles/articles.json';
import voteData from './2020-11-23/representative-votes-2020-11-23.json';

export default class FileBackedDataRepository {
  constructor() {
    this.articleData = articleData;
    this.voteData = voteData;
  }

  /**
   * @param precinct The string name of the precinct we're interested in, or omit for all precincts
   * @return A map of precinct string name to array of representative names
   */
  getRepresentativesByPrecinct(precinct = null) {
    let intermediate = {};
    this.voteData.forEach(voteRecord => {
      if (precinct == null || voteRecord.precinct === precinct) {
        if (voteRecord.precinct in intermediate) {
          intermediate[voteRecord.precinct].add(voteRecord.representativeFullName);
        } else {
          intermediate[voteRecord.precinct] = new Set([voteRecord.representativeFullName]);
        }
      }
    });

    let result = {};
    Object.entries(intermediate).forEach(pair => {
      result[pair[0]] = Array.from(pair[1]);
    });
    return result;
  }

  /**
   * @param precinct The string name of the precinct we're interested in, or omit for all precincts
   * @return A map of representative name to (articleId, vote) tuples. Note that there's no distinction
   * between representatives from different precincts, if `null` is passed into this function
   */
  getVotingRecordByPrecinct(precinct = null) {
    const representativeNameToVotes = {};
    this.voteData
      .filter(record => precinct == null || record.precinct === precinct)
      .forEach(record => {
        if (record.representativeFullName in representativeNameToVotes) {
          representativeNameToVotes[record.representativeFullName].append(record.votes);
        } else {
          representativeNameToVotes[record.representativeFullName] = [...record.votes];
        }
      });

    return representativeNameToVotes;
  }

  /**
   * @return An array of articles that have been voted on in this data set and the ID we have given it
   */
  getAllArticles() {
    return this.articleData;
  }

  getArticleById(id) {
    return this.articleData.find(a => a.id === id);
  }
}
