const {expect} = require('chai');
const ChampionMasteryV3 = require('./champion-mastery-v3');

describe('ChampionMastery-V3', () => {
  const apikey = process.env.APIKEY;
  const api = new ChampionMasteryV3(apikey);

  describe('getAllChampionMasteries', () => {
    it('should get all mastery champions', (done) => {
      setTimeout(() => {
        api.getAllChampionMasteries('EUW', 40220583)
          .then(({data}) => {
            expect(data).to.be.a('array');
            done();
          });
      }, 1000);
    });

    it('should get 404 Summoner Not Found', (done) => {
      api.getAllChampionMasteries('EUW', 'ffff')
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });

    it('should throw an error with message Region not found', (done) => {
      api.getAllChampionMasteries('xxxxx', 40220583)
        .then(() => {})
        .catch((err) => {
          expect(err.message).to.be.equal('Region not found');
          done();
        });
    });

    it('should throw an error with message Empty summonerId', (done) => {
      api.getAllChampionMasteries('EUW', null)
        .then(() => {})
        .catch((err) => {
          expect(err.message).to.be.equal('Empty summonerId');
          done();
        });
    });
  });
});
