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

    async disable(id: any){
        try {
            const image = await prisma.carouselItem.findUnique({
              where: {
                id
              }
            })
            if(image?.active == true){
              await prisma.carouselItem.update({
                where : {
                  id
                },
                data: {
                  active : false
                }
              })
            }else if(image?.active == false){
              await prisma.carouselItem.update({
                where : {
                  id
                },
                data: {
                  active : true
                }
              })
            }
        } catch (error: any) {
          throw new Error("Erro ao desabilitar unidade" + error.erros)
        }
      }
      
    
}

export default new CarouselRepository()