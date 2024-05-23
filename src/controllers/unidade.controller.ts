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

    async handleGetAllAdm(request: any, reply: any){
        const createUnidadeService = new CreateUnidadeService();
        const result = await createUnidadeService.executeGetAllAdm();
        return reply.send(result);

    }
    async handleGetOne(request: any, reply: any){
        
    }

    async handleDelete(request: any, reply: any){
        const id = request.params.id
        const createUnidadeService = new CreateUnidadeService();
        const result = await createUnidadeService.executeDelete(id);
        return reply.send(result)
    }

    async handleDisable(request: any, reply: any){
        const id = request.params.id
        const action = request.params.action
        console.log(action)
        const createUnidadeService = new CreateUnidadeService();
        const result = await createUnidadeService.executeDisable(id, action);
        return reply.send(result)
    }
}

export {UnidadeController}