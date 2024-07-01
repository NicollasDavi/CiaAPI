// import fastify from 'fastify';
// import fastifyCors from '@fastify/cors';
// import fastifyReplyFrom from '@fastify/reply-from';
// import fastifyMultipart from 'fastify-multipart';
// import { routes } from './routes';

// const app = fastify();

// app.register(fastifyCors, {
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// });
// app.register(fastifyReplyFrom);
// app.register(fastifyMultipart);

// app.register(routes);

// const port = process.env.PORT ? Number(process.env.PORT) : 4000;
// app.listen({port : port, host: '127.0.0.1'}, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server listening on ${address}`);
// });



import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import fastifyMultipart from 'fastify-multipart';
import { routes } from './routes';
import fs from 'fs';

// Carregar as chaves SSL
const privateKey = fs.readFileSync('/home/nicolas/private.key', 'utf8');
const certificate = fs.readFileSync('/home/nicolas/certificate.crt', 'utf8');
const ca = fs.readFileSync('/home/nicolas/ca_bundle.crt', 'utf8');

// Configurar as credenciais SSL
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

// Criar uma instância do Fastify com suporte a HTTPS
const app = fastify({
  https: credentials,
});

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(fastifyReplyFrom);
app.register(fastifyMultipart);

app.register(routes);

// Definir a porta do servidor
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

// Iniciar o servidor com suporte a HTTPS
app.listen({ port: port, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
