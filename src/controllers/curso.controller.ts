import { CreateCursoService } from "../services/create.curso.service";

class CursoController {
    async handleCreate(request: any, reply: any) {
        const { body } = request;
        try {
            const createcURSOService = new CreateCursoService();
            const result = await createcURSOService.executeCreate(body);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }


}

export { CursoController };