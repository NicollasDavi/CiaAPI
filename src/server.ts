import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import fastifyMultipart from '@fastify/multipart';
import * as fs from 'fs';
import { routes } from './routes';

const app = fastify({
  https: {
    key: fs.readFileSync('/home/nicolas/private.key'),
    cert: fs.readFileSync('/home/nicolas/certificate.crt'),
    ca: fs.readFileSync('/home/nicolas/ca_bundle.crt') // Inclua este se necessário
  }
});

// const app = fastify()
// Configurar CORS corretamente
// app.register(fastifyCors, {
//   origin: 'https://cursopositivocia.com.br',
//   // origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// });

app.register(fastifyCors, {
  origin: '*', // Permitir qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Permitir todos os métodos
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir os cabeçalhos especificados
  credentials: true, // Permitir envio de credenciais
  preflightContinue: false, 
  optionsSuccessStatus: 204 // Status de sucesso para requisições preflight
});


app.register(fastifyReplyFrom);

// Registrar fastify-multipart com configuração de limite de tamanho
app.register(fastifyMultipart, {
  limits: {
    fileSize: 40 * 1024 * 1024 // 40 MB
  }
});

// Registrar rotas
app.register(routes);

// Iniciar o servidor usando a nova assinatura de listen
const port = parseInt(process.env.PORT || '4000', 10);
app.listen({ port: port, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
