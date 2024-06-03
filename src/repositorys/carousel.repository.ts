import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient
class CarouselRepository{
    async save(data : string){
        const newCarouselImage = await prisma.carouselItem.create({
            data: {
                image : data
            }
        })
        return newCarouselImage
    }

    async getAll(){
        const AllCarouselImages = await prisma.carouselItem.findMany()
        return AllCarouselImages
    }
}

export default new CarouselRepository()