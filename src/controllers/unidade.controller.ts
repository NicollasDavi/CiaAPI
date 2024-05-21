import {CreateUnidadeService} from "../services/create.unidade.service"

class UnidadeController{
    async handleCreate(request: any, reply: any){
        const { body } = request
        const createUnidadeService = new CreateUnidadeService();
        const result = await createUnidadeService.executeCreate(body);
        return reply.send(result);
    }
    async handleGetAll(request: any, reply: any){
        const createUnidadeService = new CreateUnidadeService();
        const result = await createUnidadeService.executeGetAll();
        return reply.send(result);

    }
    async handleGetOne(request: any, reply: any){
        
    }
    async handleDelte(request: any, reply: any){
        const id = request.params.id
        const createUnidadeService = new CreateUnidadeService();
        const result = await createUnidadeService.executeDelete(id);
        return reply.send(result)
    }
    async handleUpdate(request: any, reply: any){
        
    }
}

export {UnidadeController}