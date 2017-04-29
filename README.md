# lolstats-riotapi

```
npm install --save lolstats-riotapi
```

### Usage

```javascript
const RiotApi = require('lolstats-riotapi');

const api = new RiotApi('<YOUR-API-KEY>');

api.SummonerV3.getSummonerByName('EUW', 'Lobo Bot')
  .then(({data}) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
```