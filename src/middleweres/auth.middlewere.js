"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewere = void 0;
var dotenv = require("dotenv");
var jwt = require("jsonwebtoken");
dotenv.config();
var authMiddlewere = function (req, res, next) {
    try {
        var authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).send();
        }
        var parts = authorization.split(" ");
        if (parts.length !== 2) {
            return res.status(401).send();
        }
        var schema = parts[0], token = parts[1];
        if (schema !== "Bearer") {
            return res.status(401).send();
        }
        var segredo = '2GxH#k8!wZs@p$U4';
        jwt.verify(token, segredo, function (error, decoded) {
            if (error) {
                return res.status(401).send();
            }
            console.log("token valido");
            next();
        });
    }
    catch (error) {
        throw new Error("Erro ao validar token");
    }
};
exports.authMiddlewere = authMiddlewere;
