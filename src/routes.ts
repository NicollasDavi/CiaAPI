import { FastifyInstance, FastifyPluginOptions} from "fastify";
import { CursoController } from "./controllers/curso.controller";
import { UserController } from "./controllers/user.controller";
import { CalcController } from "./controllers/calc.controller";
import { DocController } from "./controllers/doc.controller";
import { ValueController } from "./controllers/value.controller";
import {UnidadeController} from "./controllers/unidade.controller"
import {PdfController} from "./controllers/pdf.controller"
import { CarouselController } from "./controllers/carousel.controller"
import { AlertController } from "./controllers/alert.controller"
import { SetorController } from "./controllers/setor.controller"


import { authMiddlewere } from "./middleweres/auth.middlewere";
import { adminAuthMiddlewere } from "./middleweres/adminAuth.moddlewere";


const cursoController = new CursoController();
const userController = new UserController();
const calcController = new CalcController();
const docController = new DocController();
const valueController = new ValueController();
const unidadeController = new UnidadeController();
const pdfController = new PdfController();
const carouselController = new CarouselController();
const alertController = new AlertController();
const setorController = new SetorController();



export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    //############################### Curso ######################################//

    fastify.post("/curso", { preHandler: adminAuthMiddlewere }, cursoController.handleCreate);

    fastify.get("/curso/:id", { preHandler: authMiddlewere }, cursoController.handleGetOne);

    fastify.get("/all/cursos" ,{ preHandler: adminAuthMiddlewere }, cursoController.handleGetAllAdm);

    fastify.get("/cursos" ,{ preHandler: authMiddlewere }, cursoController.handleGetAll);

    fastify.patch("/curso/:id/:action", {preHandler : adminAuthMiddlewere}, cursoController.handleDisable)

    fastify.delete("/curso/delete/:id", { preHandler: adminAuthMiddlewere } , cursoController.handleDeleteOne);

    fastify.put("/curso/:id", { preHandler: authMiddlewere } , cursoController.handleUpdate);

    fastify.get("/curso/unidade/:unidadeId", {preHandler : authMiddlewere} , cursoController.handleGetAllByUnidade)

    //############################### User ######################################//

    fastify.post("/user", userController.handleCreate);

    fastify.post("/login", userController.handleLogin);

    fastify.patch("/user/:id", { preHandler : authMiddlewere }, userController.handleUpdate)

    fastify.get("/user/:id", { preHandler: authMiddlewere } , userController.handleGetOne);

    fastify.get("/users",{ preHandler: authMiddlewere } , userController.handleGetAll);

    fastify.delete("/user/:id", { preHandler: adminAuthMiddlewere } , userController.handleDeleteOne);

    fastify.post("/logout/:id",  userController.handleLogOut)

    //############################### isolated routes ######################################//

    fastify.post("/calc" , calcController.handleCalc);

    fastify.post("/calc/inverso", calcController.handleCalcInv);

    fastify.get("/token/{token}", { preHandler: authMiddlewere } , userController.verifyLoged)

    //############################### docs ######################################//

    fastify.post("/doc", {preHandler: authMiddlewere}, docController.handleCreate)

    fastify.get("/docs/:id",{preHandler: authMiddlewere},  docController.handleGetAll)

    fastify.get("/all/docs" , {preHandler : authMiddlewere} , docController.handleGetAllAdm)

    fastify.get("/doc/:id",{preHandler : adminAuthMiddlewere}, docController.handleGetOne)

    fastify.patch("/doc/:id/:action", {preHandler : adminAuthMiddlewere} , docController.handleDelete)

    //############################### valores ######################################//

    fastify.post("/valor", { preHandler : adminAuthMiddlewere} , valueController.handleCreate)

    fastify.get("/all/valores", {preHandler : adminAuthMiddlewere}, valueController.handleGetAllAdm)

    fastify.get("/valores", {preHandler : adminAuthMiddlewere}, valueController.handleGetAll)

    fastify.patch("/valor/:id/:action", {preHandler : adminAuthMiddlewere}, valueController.handleDisable)

    fastify.delete("/valor/:id", {preHandler : adminAuthMiddlewere} , valueController.handleDelete)

    //############################### unidades ######################################//

    fastify.post("/unidade",{preHandler : adminAuthMiddlewere}, unidadeController.handleCreate)

    fastify.get("/unidades", unidadeController.handleGetAll)

    fastify.get("/unidade/:id" ,  unidadeController.handleGetOne)

    fastify.get("/all/unidades",{preHandler : adminAuthMiddlewere}, unidadeController.handleGetAllAdm)

    fastify.delete("/unidade/:id" , {preHandler : adminAuthMiddlewere} , unidadeController.handleDelete)

    fastify.patch("/unidade/:id/:action", {preHandler : adminAuthMiddlewere}, unidadeController.handleDisable)

    //############################### pdf ######################################//

    fastify.get("/pdf", {preHandler: authMiddlewere}, pdfController.handleGet)

    fastify.get("/pdf/adm", {preHandler: authMiddlewere}, pdfController.handleGetAdm)

    
    fastify.put("/pdf", {preHandler: adminAuthMiddlewere}, pdfController.handleUpdate)

    fastify.patch("/pdf", {preHandler: adminAuthMiddlewere}, pdfController.handleDisable)

    fastify.delete("/pdf", {preHandler : adminAuthMiddlewere}, pdfController.handleDelete)
    
    //############################### carousel ######################################//

    fastify.get("/carousel/p", {preHandler: authMiddlewere}, carouselController.handleGet)

    fastify.get("/carousel", {preHandler: authMiddlewere}, carouselController.handleGetAdm)

    fastify.post("/carousel", {preHandler: adminAuthMiddlewere}, carouselController.handleCreate)

    fastify.delete("/carousel/:id", {preHandler: adminAuthMiddlewere}, carouselController.handleDelete)

    fastify.patch("/carousel/:id", {preHandler : adminAuthMiddlewere}, carouselController.handleDisable)


    //############################### Alertas ######################################//

    fastify.post("/alert", {preHandler : adminAuthMiddlewere}, alertController.handleCreate)

    fastify.get("/alerts", {preHandler : authMiddlewere}, alertController.handleGetAll)

    fastify.delete("/alert/:id",{preHandler: adminAuthMiddlewere} , alertController.handleDelete)

    //############################### Setores ######################################//

    fastify.post("/setor", {preHandler : adminAuthMiddlewere}, setorController.handleCreate)

    fastify.get("/setores", {preHandler : authMiddlewere}, setorController.handleGetAll)

    fastify.get("/setor/:id", {preHandler : authMiddlewere}, setorController.handleGetOne)

    fastify.delete("/setor/:id", {preHandler : adminAuthMiddlewere}, setorController.handleDelete)

}