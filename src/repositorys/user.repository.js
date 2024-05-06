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
var client_1 = require("@prisma/client");
var IsAuth_1 = require("../Tools/IsAuth");
var jwt = require('jsonwebtoken');
var prisma = new client_1.PrismaClient();
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.save = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var matricula, nome, senha, admin, isN, newUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        matricula = user.matricula, nome = user.nome, senha = user.senha, admin = user.admin, isN = user.isN;
                        return [4 /*yield*/, prisma.usuario.create({
                                data: {
                                    matricula: matricula,
                                    nome: nome,
                                    senha: senha,
                                    admin: admin,
                                    isN: isN
                                }
                            })];
                    case 1:
                        newUser = _a.sent();
                        return [2 /*return*/, newUser];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findedUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.usuario.findUnique({
                                where: {
                                    matricula: id
                                }
                            })];
                    case 1:
                        findedUser = _a.sent();
                        return [2 /*return*/, { findedUser: findedUser }];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.logOut = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findedUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.usuario.update({
                                where: {
                                    matricula: id
                                },
                                data: {
                                    isAuth: false
                                }
                            })];
                    case 1:
                        findedUser = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var findAllUsers, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.usuario.findMany()];
                    case 1:
                        findAllUsers = _a.sent();
                        return [2 /*return*/, { findAllUsers: findAllUsers }];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error(error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.deleteOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedUser, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.usuario.delete({
                                where: {
                                    matricula: id
                                }
                            })];
                    case 1:
                        deletedUser = _a.sent();
                        return [2 /*return*/, { deletedUser: deletedUser }];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error(error_5.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var matricula, password, matriculaInt, login, nome, isAdm, verifyToken, isAuth, createdToken, createdToken, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("entoru no login");
                        matricula = data.matricula, password = data.password;
                        matriculaInt = parseInt(matricula);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, prisma.usuario.findUnique({
                                where: {
                                    matricula: matriculaInt,
                                    senha: password
                                }
                            })];
                    case 2:
                        login = _a.sent();
                        nome = login === null || login === void 0 ? void 0 : login.nome;
                        console.log(nome);
                        if (!login) return [3 /*break*/, 9];
                        isAdm = login.admin;
                        return [4 /*yield*/, (0, IsAuth_1.verify)(matricula, login.token)];
                    case 3:
                        verifyToken = _a.sent();
                        return [4 /*yield*/, prisma.usuario.update({
                                where: {
                                    matricula: matriculaInt
                                },
                                data: {
                                    isAuth: true
                                }
                            })];
                    case 4:
                        isAuth = _a.sent();
                        if (!verifyToken) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, IsAuth_1.create)(matricula)];
                    case 5:
                        createdToken = _a.sent();
                        if (isAdm) {
                            console.log(createdToken);
                            return [2 /*return*/, { URL: "http://localhost:3000/pages/home", TOKEN: createdToken, USER: nome }];
                        }
                        else {
                            return [2 /*return*/, { URL: "http://localhost:3000/pages/home", TOKEN: createdToken, USER: nome }];
                        }
                        return [3 /*break*/, 8];
                    case 6:
                        console.log("ja tinha token");
                        (0, IsAuth_1.remove)(matricula);
                        return [4 /*yield*/, (0, IsAuth_1.create)(matricula)];
                    case 7:
                        createdToken = _a.sent();
                        if (isAdm) {
                            console.log(createdToken);
                            console.log("entrou");
                            return [2 /*return*/, { URL: "http://localhost:3000/pages/home", TOKEN: createdToken, USER: nome }];
                        }
                        else {
                            return [2 /*return*/, { URL: "http://localhost:3000/pages/home", TOKEN: createdToken, USER: nome }];
                        }
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9: throw new Error("Credenciais inválidas");
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_6 = _a.sent();
                        throw new Error(error_6.message);
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.verifyLogged = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var segredo, decodedToken, matricula, user, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        segredo = '2GxH#k8!wZs@p$U4';
                        decodedToken = jwt.verify(token, segredo);
                        console.log('Token decodificado:', decodedToken);
                        matricula = decodedToken.matricula;
                        console.log('Matrícula do usuário:', matricula);
                        return [4 /*yield*/, prisma.usuario.delete({
                                where: {
                                    matricula: matricula
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        if (user.isAuth == false) {
                            return [2 /*return*/, { URL: "http://localhost:3000/", RES: false }];
                        }
                        return [2 /*return*/, true];
                    case 2:
                        error_7 = _a.sent();
                        throw new Error(error_7.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserRepository;
}());
exports.default = new UserRepository();
