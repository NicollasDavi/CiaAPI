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
    async handleUpdate(request: any, reply: any) {
        const { body } = request;
        const id = request.params.id
        try {
            const createCursoService = new CreateValueService();
            const result = await createCursoService.executeUpdate(id, body);
            return reply.send(result);
           
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }

    async handleGetAll(request: any, reply: any){
        try{
            const createValueService = new CreateValueService();
            const result = await createValueService.executeGetAll();
            return reply.send(result);
        }catch(error: any){
            return reply.status(400).send({ error: error.message})
        }
    }

    async handleGetOne(request: any, reply: any){
        try{
            const id = request.params.id
            const {body} = request
            const createValueService = new CreateValueService();
            const result = await createValueService.executeGetOne(id)
            return reply.send(result)
        }catch(error: any){
            return reply.status(400).send({ error: error.message})
        }
    }

    async handleGetAllAdm(request: any, reply: any){
        try{
            const createValueService = new CreateValueService();
            const result = await createValueService.executeGetAllAdm();
            return reply.send(result);
        }catch(error: any){
            return reply.status(400).send({ error: error.message})
        }
    }

    async handleDisable(request: any, reply: any){
        const id = request.params.id
        const action = request.params.action
        console.log(action)

        try{
            const createValueService = new CreateValueService();
            const result = await createValueService.executeDisable(id, action);
            return reply.send(result);
        }catch(error: any){
            return reply.status(400).send({ error: error.message})
        }
    }

    async handleDelete(request: any, reply: any){
        const id = request.params.id
        console.log(id)
        try{
            const createValueService = new CreateValueService();
            const result = await createValueService.executeDelete(id);
            return reply.send(result);
        }catch(error: any){
            return reply.status(400).send({ error: error.message})
        }
    }
}

export {ValueController}