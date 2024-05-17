import {CreateUnidadeService} from "../services/create.unidade.service"

class UnidadeController{
    async handleCreate(request: any, reply: any){
        const { body } = request
        const createUnidadeService = new CreateUnidadeService();
        const result = await createUnidadeService.executeCreate(body);
    }
    async handleGetAll(request: any, reply: any){
        
    }
    async handleGetOne(request: any, reply: any){
        
    }
    async handleDelte(request: any, reply: any){
        
    }
    async handleUpdate(request: any, reply: any){
        
    }
}

export {UnidadeController}