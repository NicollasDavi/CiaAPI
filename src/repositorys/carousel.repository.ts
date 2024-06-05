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
            const allImgs = await prisma.carouselItem.findMany({
                where: {
                    active : true
                }
            });
            return allImgs
        } catch (error) {
            console.error("Erro ao obter todos os itens do carrossel:", error);
            throw error;
        }
    }

    async getAllAdm(){
        try {
            const allImgs = await prisma.carouselItem.findMany();
            return allImgs
        } catch (error) {
            console.error("Erro ao obter todos os itens do carrossel:", error);
            throw error;
        }
    }

    async delete(id: string){
        const img = await prisma.carouselItem.delete({
            where: {
                id
            }
        })
        console.log(img)
        return img
    }

    async disable(id: any, action : any){
        try {
          if(action == 0){
            console.log(id)
            const unidade = await prisma.carouselItem.update({
              where: {
                id
              },
              data: {
                active : false
              }
            })
            return {unidade}
          }else{
            const unidade = await prisma.carouselItem.update({
              where: {
                id
              },
              data: {
                active : true
              }
            })
            return {unidade}
          }
          
        } catch (error: any) {
          throw new Error("Erro ao desabilitar unidade" + error.erros)
        }
      }
      
    
}

export default new CarouselRepository()