import { CORS_ORGIN } from '@COMMON/constants';
import { Server } from './application';

const server = new Server();

server.start({
  bufferLogs: true,
  cors: {
    credentials: true,
    origin: CORS_ORGIN,
  },
});
