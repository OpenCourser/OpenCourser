var proxy = require('redbird')({
  port: 80,
  bunyan: false,
});

proxy.register('opencourser.com', 'http://localhost:3000');
proxy.register('api.opencourser.com', 'http://localhost:3333');
proxy.register('m3u8-converter.opencourser.com', 'http://localhost:3334');
