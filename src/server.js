"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
var cors_1 = require("@fastify/cors");
var reply_from_1 = require("@fastify/reply-from");
var routes_1 = require("./routes");
var app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});
app.register(reply_from_1.default);
app.register(routes_1.routes);
// Obtém o endereço IP do servidor
var os = require('os');
var interfaces = os.networkInterfaces();
var ipAddress = '';
Object.keys(interfaces).forEach(function (interfaceName) {
    interfaces[interfaceName].forEach(function (networkInterface) {
        if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
            ipAddress = networkInterface.address;
        }
    });
});
var port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen({ port: port, host: ipAddress }, function (err, address) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Server listening on ".concat(address));
});
