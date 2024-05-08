import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import { routes } from './routes';

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(fastifyReplyFrom);

app.register(routes);

const os = require('os');
const interfaces = os.networkInterfaces();
let ipAddress = '';
Object.keys(interfaces).forEach((interfaceName) => {
  interfaces[interfaceName].forEach((networkInterface : any) => {
    if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
      ipAddress = networkInterface.address;
    }
  });
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen({ port: port, host: ipAddress }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
