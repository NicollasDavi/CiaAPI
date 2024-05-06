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
exports.CreateUserService = void 0;
var zod_1 = require("zod");
var user_repository_1 = require("../repositorys/user.repository");
var IsAuth_1 = require("../Tools/IsAuth");
var CreateUserService = /** @class */ (function () {
    function CreateUserService() {
    }
    CreateUserService.prototype.executeLogin = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, user_repository_1.default.login(data)];
                }
                catch (error) {
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    CreateUserService.prototype.executeCreate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var createUserSchema, validatedData;
            return __generator(this, function (_a) {
                createUserSchema = zod_1.z.object({
                    matricula: zod_1.z.number(),
                    nome: zod_1.z.string(),
                    senha: zod_1.z.string(),
                    admin: zod_1.z.boolean(),
                    isN: zod_1.z.boolean(),
                    token: zod_1.z.string(),
                    isAuth: zod_1.z.boolean()
                });
                try {
                    validatedData = createUserSchema.parse(data);
                    return [2 /*return*/, user_repository_1.default.save(data)];
                }
                catch (error) {
                    throw new Error("Erro de validação: " + error.errors);
                }
                return [2 /*return*/];
            });
        });
    };
    CreateUserService.prototype.executeGetOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_repository_1.default.getOne(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Erro de validação: " + error_1.errors);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateUserService.prototype.executeLogOut = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, IsAuth_1.remove)(id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_repository_1.default.logOut(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Erro de validação: " + error_2.errors);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreateUserService.prototype.executeGetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_repository_1.default.getAll()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error("Erro de validação " + error_3.errors);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateUserService.prototype.executeDeleteOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_repository_1.default.deleteOne(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error("Erro de validação: " + error_4.errors);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreateUserService.prototype.executeVerifyLogged = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_repository_1.default.verifyLogged(token)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error("Erro de validação: " + error_5.errors);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CreateUserService;
}());
exports.CreateUserService = CreateUserService;
