import { CreateSetorService } from "../services/create.setor.service"

class SetorController{
    async handleCreate(request: any, reply: any){
        const { body } = request
        const createSetorService = new CreateSetorService();
        const result = await createSetorService.executeCreate(body);
        return reply.send(result)
    }

    async handleGet(request: any, reply: any){
        const id = request.params.id
        const createSetorService = new CreateSetorService();
        const result = await createSetorService.executeGetOne(id);
        return reply.send(result)
    }

    async handleGetAll(request: any, reply: any){
        const createSetorService = new CreateSetorService();
        const result = await createSetorService.executeGet()
        return reply.send(result)
    }

    async handleDelete(request: any, reply: any){
        const createSetorService = new CreateSetorService();
        const result = await createSetorService.executeDelete();
        return reply.send(result)
    }
}

export { SetorController }