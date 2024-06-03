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
    console.log(result)
    return reply.send(result)
 }

}

export { CarouselController }