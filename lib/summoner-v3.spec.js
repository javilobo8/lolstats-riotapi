const {expect} = require('chai');
const SummonerV3 = require('./summoner-v3');

describe('Summoner-V3', () => {
  const apikey = process.env.APIKEY;
  const api = new SummonerV3(apikey);

  describe('getSummonerByName', () => {
    it('should get summoner information', (done) => {
      api.getSummonerByName('EUW', 'Lobo Bot')
        .then(({status, data}) => {
          expect(status).to.be.equal(200);
          expect(data).to.be.a('object');
          done();
        });
    });

    it('should not get 404 summoner information', (done) => {
      api.getSummonerByName('EUW', 'asldkfjp38838')
        .catch((err) => {
          expect(err.response.status).to.be.equal(404);
          done();
        });
    });

    it('should throw an error with message Region not found', (done) => {
      api.getSummonerByName('EeUW', 'Lobo Bot')
        .then(() => {})
        .catch((err) => {
          expect(err.message).to.be.equal('Region not found');
          done();
        });
    });

    it('should throw an error with message Empty summonerName', (done) => {
      api.getSummonerByName('EUW', null)
        .then(() => {})
        .catch((err) => {
          expect(err.message).to.be.equal('Empty summonerName');
          done();
        });
    });
  });
});
