import { CreateCarouselService } from "../services/create.carousel.service"

class CarouselController{
 async handleCreate( request: any, reply: any){
    const { body } = request
    const createCarouselService = new CreateCarouselService();
    const result = await createCarouselService.executeCreate(body);
    return reply.send(result)
 }

 async handleGet(request : any, reply: any){
    const createCarouselService = new CreateCarouselService();
    const result = await createCarouselService.executeGet()
    return reply.send(result)
 }

 async handleGetAdm(request: any, reply: any){
   const createCarouselService = new CreateCarouselService();
   const result = await createCarouselService.executeGetAdm()
   return reply.send(result)
 }

 async handleDelete(request: any, reply: any){
   const id = request.params.id
   const createCarouselService = new CreateCarouselService();
   const result = await createCarouselService.executeDelete(id)
   return reply.send(result)
 }

 async handleDisable(request: any, reply: any){
   const id = request.params.id
   const createCarouselService = new CreateCarouselService();
   const result = await createCarouselService.executeDisable(id)
   return reply.send(result)
}

}

export { CarouselController }