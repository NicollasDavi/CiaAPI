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

    async handleGetOne(request: any, reply: any){
        const id = request.params.id;
        try{
            const createCursoService = new CreateCursoService();
            const result = await createCursoService.executeGetOne(id);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }

    async handleGetAll(request: any, reply: any){
        try {
            const createCursoService = new CreateCursoService();
            const result = await createCursoService.executeGetAll();
            return reply.send(result)
        } catch (error: any) {
            return reply.status(400).send({ error: error.message })
        }
    }

    async handleDeleteOne(request: any, reply: any){
        const id = request.params.id;
        try{
            const createCursoService = new CreateCursoService();
            const result = await createCursoService.executeDeleteOne(id);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }

    async handleUpdate(request: any, reply: any){
        
        const id = request.params.id;
        console.log(id)

        const { body } = request;
        try {
            const createCursoService = new CreateCursoService();
            const result = await createCursoService.executeUpdate(id, body);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({error: error.message})
        }
    }
}

export { CursoController };