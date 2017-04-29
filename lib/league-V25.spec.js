const {expect} = require('chai');
const LeagueV25 = require('./league-V25');

describe('League-V2.5', () => {
  const apikey = process.env.APIKEY;
  const api = new LeagueV25(apikey);

  describe('getLeagueEntriesForSummonerIds', () => {
    it('should get league information', (done) => {
      api.getLeagueEntriesForSummonerIds('EUW', 40220583)
        .then(({status, data}) => {
          expect(status).to.be.equal(200);
          expect(data).to.be.a('object');
          done();
        });
    });

    it('should get 404 Data Not Found', (done) => {
      api.getLeagueEntriesForSummonerIds('EUW', 71810562)
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });

    it('should throw an error with message Region not found', (done) => {
      api.getLeagueEntriesForSummonerIds('EeUW', 40220583)
        .then(() => {})
        .catch((err) => {
          expect(err.message).to.be.equal('Region not found');
          done();
        });
    });

    it('should throw an error with message Empty summonerId', (done) => {
      api.getLeagueEntriesForSummonerIds('EUW', null)
        .then(() => {})
        .catch((err) => {
          expect(err.message).to.be.equal('Empty summonerId');
          done();
        });
    });
  });
});
