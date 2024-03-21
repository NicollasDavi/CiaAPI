import { FastifyRequest } from "fastify";
import { CreateCursoService } from "../services/create.curso.service";

class CursoController {
    async handleCreate(request: any, reply: any) {
        const { body } = request;
        try {
            const createCursoService = new CreateCursoService();
            const result = await createCursoService.executeCreate(body);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }

    async handleGetOne(request: FastifyRequest<{ Params: { id: string } }>, reply: any){
        const id = request.params.id;
        try{
            const createCursoService = new CreateCursoService();
            const result = await createCursoService.executeGetOne(id);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }


}

export { CursoController };