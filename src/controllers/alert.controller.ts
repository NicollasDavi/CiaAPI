import {CreateAlertService} from "../services/create.alert.service"

class AlertController {
    async handleCreate(request: any, reply: any){
        const { body } = request
        console.log(body)
        const createAlertService = new CreateAlertService();
        const result = await createAlertService.executeCreate(body);
        return reply.send(result)
    }

    async handleGetAll(request: any, reply: any){
        const createAlertService = new CreateAlertService();
        const result = await createAlertService.executeGetAll();
        return reply.send(result)
    }

    async handleDelete(request: any, reply: any){
        const id = request.params.id;
        console.log(id)
        const createAlertService = new CreateAlertService();
        const result = await createAlertService.executeDelete(id)
        return reply.send(result)
    }
}

export { AlertController }