import { CreateValueService } from "../services/create.value.service";

class ValueController{
    async handleCreate(request: any, reply: any) {
        const { body } = request;
        try {
            const createCursoService = new CreateValueService();
            const result = await createCursoService.executeCreate(body);
            return reply.send(result);
           
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }
}

export {ValueController}