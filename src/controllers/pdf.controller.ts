import { CreatePdfService } from "../services/create.pdf.service";

class PdfController{
    async handleCreate(request: any, reply: any){
        const {body} = request
        const createPdfService = new CreatePdfService()
        const result = await createPdfService.executeCreate(body)
        return reply.send(result)
    }

    async handleGet(request: any, reply: any){
        const createPdfService = new CreatePdfService()
        const result = await createPdfService.executeGet()
        return reply.send(result)
    }

    async handleUpdate(request:any, reply: any){
        const { body } = request
        const createPdfService = new CreatePdfService()
        const result = createPdfService.executeUpdate(body)
        return reply.send(result)
    }

    async handleDelete(request: any, reply: any){
        const createPdfService = new CreatePdfService()
        const result = createPdfService.executeDelete()
        return reply.send(result)
    }

    async handleDisable(request: any, reply: any){
        const { action } = request.params.action
        const createPdfService = new CreatePdfService()
        const result = createPdfService.executeDisable(action)
    }
}
export { PdfController }