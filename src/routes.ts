import { FastifyInstance, FastifyPluginOptions} from "fastify";
import { CursoController } from "./controllers/curso.controller";
import { UserController } from "./controllers/user.controller";
import { CalcController } from "./controllers/calc.controller";
import { DocController } from "./controllers/doc.controller";
import { authMiddlewere } from "./middleweres/auth.middlewere";
import { ValueController } from "./controllers/value.controller";
import { adminAuthMiddlewere } from "./middleweres/adminAuth.moddlewere";


const cursoController = new CursoController();
const userController = new UserController();
const calcController = new CalcController();
const docController = new DocController();
const valueController = new ValueController();


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    //############################### User ######################################//

    fastify.post("/curso", { preHandler: adminAuthMiddlewere }, cursoController.handleCreate);

    fastify.get("/curso/:id", { preHandler: authMiddlewere }, cursoController.handleGetOne);

    fastify.get("/cursos" ,{ preHandler: authMiddlewere }, cursoController.handleGetAll);

    fastify.delete("/curso/delete/:id", { preHandler: adminAuthMiddlewere } , cursoController.handleDeleteOne);

    fastify.put("/curso/:id", { preHandler: authMiddlewere } , cursoController.handleUpdate);

    //############################### User ######################################//

    fastify.post("/user", userController.handleCreate);

    fastify.post("/login", userController.handleLogin);

    fastify.get("/user/:id", { preHandler: authMiddlewere } , userController.handleGetOne);

    fastify.get("/users",{ preHandler: authMiddlewere } , userController.handleGetAll);

    fastify.delete("/user/:id", { preHandler: adminAuthMiddlewere } , userController.handleDeleteOne);

    fastify.post("/logout/:id",  userController.handleLogOut)

    //############################### isolated routes ######################################//

    fastify.post("/calc", { preHandler: authMiddlewere } , calcController.handleCalc);

    fastify.get("/token/{token}", { preHandler: authMiddlewere } , userController.verifyLoged)

    //############################### docs ######################################//

    fastify.post("/doc", {preHandler: authMiddlewere}, docController.handleCreate)

    fastify.get("/docs",{preHandler: authMiddlewere},  docController.handleGetAll)

    fastify.get("/doc/:id",  docController.handleGetOne)

    //############################### valores ######################################//

    fastify.post("/valor", { preHandler : adminAuthMiddlewere} , valueController.handleCreate)

    fastify.get("/valores", {preHandler : authMiddlewere}, valueController.handleGetAll)   
    
}