import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import { routes } from './routes';
import fetch from 'node-fetch';

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(fastifyReplyFrom);

app.register(routes);

async function getPublicIPAddress() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Erro ao obter endereço IP público:', error);
    return null;
  }
}

async function startServer() {
  const publicIPAddress = await getPublicIPAddress();
  if (!publicIPAddress) {
    console.error('Não foi possível obter o endereço IP público. O servidor não será iniciado.');
    return;
  }

  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  app.listen({ port: port, host: publicIPAddress }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Servidor ouvindo em ${address}`);
  });
}

startServer();
