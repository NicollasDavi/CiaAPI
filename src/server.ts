import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import fastifyMultipart from 'fastify-multipart';
import { routes } from './routes';

const app = fastify();

// Registrar plugins
app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
app.register(fastifyReplyFrom);
app.register(fastifyMultipart); // Registrar o plugin fastify-multipart

// Registrar rotas
app.register(routes);

// Iniciar o servidor
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen({port : port, host: '127.0.0.1'}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
