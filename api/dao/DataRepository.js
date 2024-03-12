const fs = require('fs');

class FileBackedDataRepository {
  constructor() {
    this.articleData = JSON.parse(fs.readFileSync('./dao/articles.json'));
    this.tmmVotes = JSON.parse(fs.readFileSync('./dao/tmm-votes-with-reelection.json'));
  }

  getTownMeetingMembers(precinct = null) {
    const seenTownMeetingMembers = new Set();
    const townMeetingMembers = [];
    this.townMeetingMemberVotes.forEach(voteRecord => {
      if (
        seenTownMeetingMembers.has(voteRecord.townMeetingMemberFullName) ||
        (precinct != null && voteRecord.precinct !== precinct)
      ) {
        return;
      }

      townMeetingMembers.push({
        fullName: voteRecord.townMeetingMemberFullName,
        precinct: voteRecord.precinct,
        reelection: voteRecord.reelection
      });
      seenTownMeetingMembers.add(voteRecord.townMeetingMemberFullName);
    });

    return townMeetingMembers;
  }

  /**
   * @param precinct The string name of the precinct we're interested in, or omit for all precincts
   * @return A map of townMeetingMember name to (articleId, vote) tuples. Note that there's no distinction
   * between townMeetingMembers from different precincts, if `null` is passed into this function
   */
  getVotingRecordByPrecinct(precinct = null) {
    const townMeetingMemberNameToVotes = {};
    this.townMeetingMemberVotes
      .filter(record => precinct == null || record.precinct === precinct)
      .forEach(record => {
        if (record.townMeetingMemberFullName in townMeetingMemberNameToVotes) {
          townMeetingMemberNameToVotes[record.townMeetingMemberFullName].push(...record.votes);
        } else {
          townMeetingMemberNameToVotes[record.townMeetingMemberFullName] = [...record.votes];
        }
      });

    return townMeetingMemberNameToVotes;
  }

  /**
   * @return An array of articles that have been voted on in this data set and the ID we have given it
   */
  getArticles() {
    return this.articleData;
  }

  /**
   * @param id ID of the article to find
   * @return Details for a specific article that was voted on
   */
  getArticleById(id) {
    return this.articleData.find(a => a.id === id);
  }
}

module.exports = function () {
  return new FileBackedDataRepository();
};
