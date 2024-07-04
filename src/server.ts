import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyReplyFrom from '@fastify/reply-from';
import fastifyMultipart from '@fastify/multipart';
import fs from 'fs';
import { routes } from './routes';

const app = fastify({
  https: {
    key: fs.readFileSync('/home/nicolas/private.key'),
    cert: fs.readFileSync('/home/nicolas/certificate.crt'),
    ca: fs.readFileSync('/home/nicolas/ca_bundle.crt') // Inclua este se necessário
  }
});

// Configurar CORS corretamente
app.register(fastifyCors, {
  origin: 'https://cursopositivocia.com.br',
  // origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
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

// Iniciar o servidor
const port = parseInt(process.env.PORT || '4000', 10);
app.listen(port, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
