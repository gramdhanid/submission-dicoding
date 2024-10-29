const Hapi = require('@hapi/hapi');
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
} = require('./handlers');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
          origin: ['*'],
      }
    }
  });

  server.route([
    {
      method: 'POST',
      path: '/books',
      handler: addBookHandler,
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllBooksHandler,
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: getBookByIdHandler,
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: updateBookHandler,
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBookHandler,
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();