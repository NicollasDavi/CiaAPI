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

    async handleGetAll(request: any, reply: any){
        try{
            const createUserService = new CreateValueService();
            const result = await createUserService.executeGetAll();
            return reply.send(result);
        }catch(error: any){
            return reply.status(400).send({ error: error.message})
        }
    }

    async handleGetAllAdm(request: any, reply: any){
        try{
            const createUserService = new CreateValueService();
            const result = await createUserService.executeGetAllAdm();
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
            const createUserService = new CreateValueService();
            const result = await createUserService.executeDisable(id, action);
            return reply.send(result);
        }catch(error: any){
            return reply.status(400).send({ error: error.message})
        }
    }

    async handleDelete(request: any, reply: any){
        const id = request.params.id
        try{
            const createUserService = new CreateValueService();
            const result = await createUserService.executeDelete(id);
            return reply.send(result);
        }catch(error: any){
            return reply.status(400).send({ error: error.message})
        }
    }
}

export {ValueController}