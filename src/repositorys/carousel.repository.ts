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
        try {
            const allImgs = await prisma.carouselItem.findMany();
            return allImgs
        } catch (error) {
            console.error("Erro ao obter todos os itens do carrossel:", error);
            throw error;
        }
    }
    
}

export default new CarouselRepository()