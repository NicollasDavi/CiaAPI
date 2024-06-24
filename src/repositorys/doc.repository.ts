import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DocRepository{
    async save(data : any){
        try {
            const pagina = await prisma.pagina.create({
              data: {
                nome: data.nome,
                publica: data.publica,
                usuario: { connect: { matricula:  parseInt(data.userId)  } },
                tipos: {
                  create: data.types.map((tipo : any)=> ({
                    type: tipo.type,
                    text: tipo.text,
                    img: tipo.img,
                    arqId: tipo.arqId,
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

        async getAll(id: string){
          try {
              const allDocs = await prisma.pagina.findMany({
                where: {
                  active : true,
                  publica : true
                }
              });
              const uId = parseInt(id)
              const allDocs2 = await prisma.pagina.findMany({
                where: {
                  active : true,
                  userId: uId
                }
              });
              const combinedDocs = [...allDocs, ...allDocs2];
              return combinedDocs
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

    async getOne(id: string) {
      try {
          const docTypes = await prisma.tipoDocumento.findMany({
              where: {
                  paginaId: id
              }
          });
          const pagina = await prisma.pagina.findUnique({
              where: {
                  id: id
              },
              select: {
                  userId: true,
                  nome: true
              }
          });
  
          if (!pagina) {
              throw new Error(`Página com id ${id} não encontrada`);
          }
          console.log(pagina)
          return { docTypes, userId: pagina.userId, nome: pagina.nome};
      } catch (error: any) {
          throw new Error(`Erro na consulta: ${error.message}`);
      }
  }
  

  async delete(id: string, action: number) {
    try {
      // Verifica se a ação é 0
      if (action == 0) {
        // Verifica se o documento já é público
        const docIsAlreadyPublic = await prisma.pagina.findUnique({
          where: {
            id,
          },
        });
  
        // Se o documento não é público, deleta o documento
        if (docIsAlreadyPublic?.publica == false) {
          await prisma.tipoDocumento.deleteMany({
            where : {
              paginaId : id
            }
          })
          
          const doc = await prisma.pagina.delete({
            where: {
              id,
            }
          });
          return { doc };
        } 
        // Se o documento já é público, desativa o documento
        else if (docIsAlreadyPublic?.publica == true) {
          console.log("è publico")
          const doc = await prisma.pagina.update({
            where: {
              id,
            },
            data: {
              active: false,
            }
          });
          return { doc };
        }
      } 
      // Verifica se a ação é 1
      else if (action == 1) {
        // Ativa o documento
        const doc = await prisma.pagina.update({
          where: {
            id,
          },
          data: {
            active: true,
          },
        });
        return { doc };
      }
    } catch (error: any) {
      throw new Error("Deu ruim");
    }
  }
  
      
        
    }

export default new DocRepository();