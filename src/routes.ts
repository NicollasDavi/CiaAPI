import { FastifyInstance, FastifyPluginOptions} from "fastify";
import { CursoController } from "./controllers/curso.controller";

const cursoController = new CursoController();


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/curso", cursoController.handleCreate);

    fastify.get("/curso/:id", cursoController.handleGetOne);

    fastify.delete("/curso/:id", cursoController.handleDeleteOne);

    fastify.put("/curso/:id", cursoController.handleUpdate);
}