import app from './app.js';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

export default app
  .listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}`)
  });
  