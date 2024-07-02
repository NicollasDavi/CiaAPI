import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import fastifyMultipart from 'fastify-multipart';
import { routes } from './routes';

const app = fastify();

app.register(fastifyCors, {
  origin: true, // Permite qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permite envio de cookies e cabeçalhos de autenticação
});
app.register(fastifyReplyFrom);
app.register(fastifyMultipart);

app.register(routes);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen({ port: port, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
