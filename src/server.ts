import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import { routes } from './routes';

const app = fastify();

// Registro de plugins
app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Registre o plugin fastify-reply-from
app.register(fastifyReplyFrom);

// Registre suas rotas
app.register(routes);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
