import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import fastifyMultipart from 'fastify-multipart';
import { routes } from './routes';

const app = fastify();

// Configuração do CORS
app.register(fastifyCors, {
  origin: 'http://cursopositivocia.com.br', // Especifique o domínio permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Inclua OPTIONS para pré-solicitações
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true,
  optionsSuccessStatus: 204
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
