"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var curso_controller_1 = require("./controllers/curso.controller");
var user_controller_1 = require("./controllers/user.controller");
var calc_controller_1 = require("./controllers/calc.controller");
var doc_controller_1 = require("./controllers/doc.controller");
var auth_middlewere_1 = require("./middleweres/auth.middlewere");
var cursoController = new curso_controller_1.CursoController();
var userController = new user_controller_1.UserController();
var calcController = new calc_controller_1.CalcController();
var docController = new doc_controller_1.DocController();
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //############################### User ######################################//
            fastify.post("/curso", { preHandler: auth_middlewere_1.authMiddlewere }, cursoController.handleCreate);
            fastify.get("/curso/:id", { preHandler: auth_middlewere_1.authMiddlewere }, cursoController.handleGetOne);
            fastify.get("/cursos", { preHandler: auth_middlewere_1.authMiddlewere }, cursoController.handleGetAll);
            fastify.delete("/curso/delete/:id", { preHandler: auth_middlewere_1.authMiddlewere }, cursoController.handleDeleteOne);
            fastify.put("/curso/:id", { preHandler: auth_middlewere_1.authMiddlewere }, cursoController.handleUpdate);
            //############################### User ######################################//
            fastify.post("/user", { preHandler: auth_middlewere_1.authMiddlewere }, userController.handleCreate);
            fastify.post("/login", userController.handleLogin);
            fastify.get("/user/:id", { preHandler: auth_middlewere_1.authMiddlewere }, userController.handleGetOne);
            fastify.get("/users", { preHandler: auth_middlewere_1.authMiddlewere }, userController.handleGetAll);
            fastify.delete("/user/:id", { preHandler: auth_middlewere_1.authMiddlewere }, userController.handleDeleteOne);
            fastify.post("/logout/:id", userController.handleLogOut);
            //############################### isolated routes ######################################//
            fastify.post("/calc", { preHandler: auth_middlewere_1.authMiddlewere }, calcController.handleCalc);
            fastify.get("/token/{token}", { preHandler: auth_middlewere_1.authMiddlewere }, userController.verifyLoged);
            //############################### docs ######################################//
            fastify.post("/doc", { preHandler: auth_middlewere_1.authMiddlewere }, docController.handleCreate);
            fastify.get("/docs/:id", docController.handleGetAll);
            return [2 /*return*/];
        });
    });
}
exports.routes = routes;
