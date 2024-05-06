import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DocRepository{
    async save(data : any){
      const userId = 105404
        try {
            const pagina = await prisma.pagina.create({
              data: {
                nome: data.nome,
                usuario: { connect: { matricula:  userId  } },
                tipos: {
                  create: data.types.map((tipo : any)=> ({
                    type: tipo.type,
                    text: tipo.text,
                    img: tipo.img
                  }))
                }
              },
              include: {
                tipos: true
              }
            });
        
            return {pagina};
          } catch (error) {
            throw error;
          }
        }


        async getAll(id : number){
          try{
            const userDocs = await prisma.pagina.findMany({
              where:{
                userId : id
              }
            })
            return {userDocs}
          }catch(error: any){
            throw new Error("Erro ao encontrar Docs")
          }
        }
        
    }

export default new DocRepository();