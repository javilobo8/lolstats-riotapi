const {expect} = require('chai');
const LeagueV3 = require('./league-V3');

describe('League-V3', () => {
  const apikey = process.env.APIKEY;
  const api = new LeagueV3(apikey);

  describe('getAllLeaguePositionsForSummoner', () => {
    it('should get league information', (done) => {
      api.getAllLeaguePositionsForSummoner('EUW', 40220583)
        .then(({status, data}) => {
          expect(status).to.be.equal(200);
          expect(data).to.be.a('array');
          done();
        });
    });

    it('should get an empty array if no data', (done) => {
      api.getAllLeaguePositionsForSummoner('EUW', 718105212341234)
        .then(({data}) => {
          expect(data).to.deep.equal([]);
          done();
        });
    });

    it('should throw an error with message Region not found', (done) => {
      api.getAllLeaguePositionsForSummoner('EeUW', 40220583)
        .then(() => {})
        .catch((err) => {
          expect(err.message).to.be.equal('Region not found');
          done();
        });
    });

    it('should throw an error with message Empty summonerId', (done) => {
      api.getAllLeaguePositionsForSummoner('EUW', null)
        .then(() => {})
        .catch((err) => {
          expect(err.message).to.be.equal('Empty summonerId');
          done();
        });
    });
  });
});
