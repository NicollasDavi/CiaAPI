const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

const app = express();

// Configurar CORS
app.use(cors());

// Middleware para parse de JSON
app.use(express.json());

// Registrar rotas (exemplo)
app.post('/login', (req : any, res : any) => {
  // Lógica de login
  res.json({ message: 'Login successful' });
});

// Configurar HTTPS
const options = {
  key: fs.readFileSync('/home/nicolas/private.key'),
  cert: fs.readFileSync('/home/nicolas/certificate.crt'),
  ca: fs.readFileSync('/home/nicolas/ca_bundle.crt') // Inclua este se necessário
};

const port = process.env.PORT || 4000;
https.createServer(options, app).listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
