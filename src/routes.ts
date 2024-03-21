import { FastifyInstance, FastifyPluginOptions} from "fastify";
import { CursoController } from "./controllers/curso.controller";

const cursoController = new CursoController();


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/cursos", cursoController.handleCreate);
}