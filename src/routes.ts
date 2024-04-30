import { FastifyInstance, FastifyPluginOptions} from "fastify";
import { CursoController } from "./controllers/curso.controller";
import { UserController } from "./controllers/user.controller";
import { CalcController } from "./controllers/calc.controller";

const cursoController = new CursoController();
const userController = new UserController();
const calcController = new CalcController();


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    //############################### User ######################################//

    fastify.post("/curso", cursoController.handleCreate);

    fastify.get("/curso/:id", cursoController.handleGetOne);

    fastify.get("/cursos", cursoController.handleGetAll);

    fastify.delete("/curso/delete/:id", cursoController.handleDeleteOne);

    fastify.put("/curso/:id", cursoController.handleUpdate);

    //############################### User ######################################//

    fastify.post("/user", userController.handleCreate);

    fastify.post("/login", userController.handleLogin);

    fastify.get("/user/:id", userController.handleGetOne);

    fastify.get("/users", userController.handleGetAll);

    fastify.delete("/user/:id", userController.handleDeleteOne);

    //############################### calc ######################################//

    fastify.post("/calc", calcController.handleCalc);
    
}