import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DocRepository{
    async save(data : any){
      const userId = 105404
        console.log(data)
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
        
            console.log('Página e tipos de documentos salvos:', pagina);
            return {pagina};
          } catch (error) {
            console.error('Erro ao salvar página:', error);
            throw error;
          }
        }


        async getAll(id : number){
          console.log(id)
          try{
            const userDocs = await prisma.pagina.findMany({
              where:{
                userId : id
              }
            })
            console.log("teste", userDocs)
            return {userDocs}
          }catch(error: any){
            throw new Error("Erro ao encontrar Docs")
          }
        }
        
    }

export default new DocRepository();