import router from './controllers';
import initializeServer from './initializeServer';

const app = initializeServer(router);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}`));