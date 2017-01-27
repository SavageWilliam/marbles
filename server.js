const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 4000
});

server.register(Inert, (err) => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './'
      }
    }
  });
});

server.start( (err) => {
  if (err) throw err;
  console.log(`Server is running on port: ${server.info.uri}`);
});
