import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DocRepository{
    async save(data : any){
        try {
            const pagina = await prisma.pagina.create({
              data: {
                nome: data.nome,
                usuario: { connect: { matricula:  data.userId  } },
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
            console.log(pagina)
            return {pagina};
          } catch (error) {
            throw error;
          }
        }


        async getAll(){
          try {
              const allDocs = await prisma.pagina.findMany({
                where: {
                  active : true
                }
              });
              return allDocs
          } catch (error: any) {
              throw new Error("Erro na consulta")
          }
      }

      async getAllAdm(){
        try {
            const allDocs = await prisma.pagina.findMany();
            return allDocs
        } catch (error: any) {
            throw new Error("Erro na consulta")
        }
    }

      async getOne(id: string){
        try{
          const docTypes = await prisma.tipoDocumento.findMany({
            where:{
              paginaId : id
            }
          })
          return {docTypes}
        }catch(error : any){
          throw new Error("Erro na consulta")
        }
      }

      async delete(id : string){
        try{
          const doc = await prisma.pagina.update({
            where: {
              id : id
            },
            data:{
              active : false
            }
          })
          return {doc}
        }catch (error : any){
          throw new Error("Deu ruim")
        }
      }
      
        
    }

export default new DocRepository();