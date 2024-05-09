import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import { routes } from './routes';
import * as fs from 'fs'
import * as path from 'path';

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

// Caminhos para o certificado SSL e a chave privada
const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, 'caminho-para-sua-chave-privada.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'caminho-para-seu-certificado.crt')),
};

app.listen({ port: port, host: '127.0.0.1', ...sslOptions }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
