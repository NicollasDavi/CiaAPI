import { FastifyInstance, FastifyPluginOptions} from "fastify";
import { CursoController } from "./controllers/curso.controller";
import { UserController } from "./controllers/user.controller";
import { CalcController } from "./controllers/calc.controller";
import { DocController } from "./controllers/doc.controller";
import { authMiddlewere } from "./middleweres/auth.middlewere";

const cursoController = new CursoController();
const userController = new UserController();
const calcController = new CalcController();
const docController = new DocController();



export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    //############################### User ######################################//

    fastify.post("/curso", { preHandler: authMiddlewere }, cursoController.handleCreate);

    fastify.get("/curso/:id", { preHandler: authMiddlewere }, cursoController.handleGetOne);

    fastify.get("/cursos", { preHandler: authMiddlewere } , cursoController.handleGetAll);

    fastify.delete("/curso/delete/:id", { preHandler: authMiddlewere } , cursoController.handleDeleteOne);

    fastify.put("/curso/:id", { preHandler: authMiddlewere } , cursoController.handleUpdate);

    //############################### User ######################################//

    fastify.post("/user", { preHandler: authMiddlewere }, userController.handleCreate);

    fastify.post("/login", userController.handleLogin);

    fastify.get("/user/:id", { preHandler: authMiddlewere } , userController.handleGetOne);

    fastify.get("/users",{ preHandler: authMiddlewere } , userController.handleGetAll);

    fastify.delete("/user/:id", { preHandler: authMiddlewere } , userController.handleDeleteOne);

    fastify.post("/logout/:id",  userController.handleLogOut)

    //############################### isolated routes ######################################//

    fastify.post("/calc", { preHandler: authMiddlewere } , calcController.handleCalc);

    fastify.get("/token/{token}", { preHandler: authMiddlewere } , userController.verifyLoged)

    //############################### docs ######################################//

    fastify.post("/doc", {preHandler: authMiddlewere}, docController.handleCreate)
    
}