import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import fastifyMultipart from 'fastify-multipart';
import fs from 'fs';
import { routes } from './routes';

const app = fastify({
  https: {
    key: fs.readFileSync('/home/nicolas/private.key'),
    cert: fs.readFileSync('/home/nicolas/certificate.crt'),
    ca: fs.readFileSync('/home/nicolas/ca_bundle.crt') // Inclua este se necessário
  }
});

app.register(fastifyCors, {
  origin: '*', // Permite qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permite envio de cookies e cabeçalhos de autenticação
});
app.register(fastifyReplyFrom);
app.register(fastifyMultipart);

app.register(routes);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen({ port: port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
