import {CreateDocService} from "../services/create.doc.service"

class DocController{
    async handleCreate(request: any, reply: any){
        const { body } = request
        const createDocService = new CreateDocService();
        const result = await createDocService.executeCreate(body);
    }

    async handleGetAll(request: any, reply: any){
        const createDocService = new CreateDocService();
        const result = await createDocService.executeGetAll();
        return reply.send(result);
    }

    async handleGetOne(request: any, reply: any){
        const id = parseInt(request.params.id);
        const createDocService = new CreateDocService();
        const result = await createDocService.executeGetOne(id);
        return reply.send(result);
    }
}

export { DocController }