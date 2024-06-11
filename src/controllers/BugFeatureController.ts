import { CreateBugFeaturetService } from "../services/create.bugfeature.service"

class BugFeatureController{
    async handleCreate(request: any, reply : any){
        const { body } = request
        const createBugFeatureController = new CreateBugFeaturetService
        const result = await createBugFeatureController.executeCreate(body)
        return reply.send(result)
    }

    async handleGetAll(request: any, reply : any){
        const createBugFeatureController = new CreateBugFeaturetService();
        const result = await createBugFeatureController.executeGetAll()
        return reply.send(result)
    }

    async handleDelete(request: any, reply : any){
        const id = request.params.id
        const createBugFeatureController = new CreateBugFeaturetService();
        const result = await createBugFeatureController.executeDelete(id)
        return reply.send(result)
    }

}

export {BugFeatureController}