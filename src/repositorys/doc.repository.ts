import {PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DocRepository{
    async save(data : any){
        console.log(data)
        try {
            const pagina = await prisma.Pagina.create({
              data: {
                nome: data.nome,
                tipos: {
                  create: data.types.map((tipo : any)=> ({
                    type: tipo.type,
                    text: tipo.text,
                    img: tipo.img
                  }))
                }
              },
              // Incluir tipos de documentos associados à página criada
              include: {
                tipos: true
              }
            });
        
            console.log('Página e tipos de documentos salvos:', pagina);
            return pagina;
          } catch (error) {
            console.error('Erro ao salvar página:', error);
            throw error;
          }
        }
        
    }

export default new DocRepository();