const GongoServer = require('gongo-server').GongoServer;

const server = new GongoServer({
  mongoUrl: 'mongodb://mongo/gongo?replicaSet=rs0'
});

server.listen(3000);

server.publish('sessions', db => db.collection('sessions').find());
