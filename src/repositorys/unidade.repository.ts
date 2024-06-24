import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UnidadeRepository {
  async save(data: any) {
    try {
      const unidade = await prisma.unidades.create({
        data: {
          horario: data.horario,
          informacoes: data.informacoes,
          nome: data.nome,
          numeroTel: data.numeroTel,
          numeroWpp: data.numeroWpp,
          vcep: data.vcep,
          imagem: data.imagem
        },
      });
      console.log(unidade);
      return { unidade };
    } catch (error) {
      throw error;
    }
  }

  async getAll(){
    try {
      const unidades = await prisma.unidades.findMany({
        where:{
          active : true
        }
      });
      return unidades
    } catch (error: any) {
      throw new Error("Deu rium patrão")
    }
  }

  async getAllAdm(){
    try {
      const unidades = await prisma.unidades.findMany();
      return unidades
    } catch (error: any) {
      throw new Error("Deu rium patrão")
    }
  }

  async getOne(id: string) {
    try {
        return( await prisma.unidades.findUnique({
          where : {
            codigo: id
          }
        }))
    } catch (error) {
        return null;
    }
}

  async delete(id : any){
    console.log(id)
    try {
      const curso = await prisma.cursoUnidade.findFirst({
        where:{
          unidadeId : id
        }
      })
      console.log(curso)
      if(curso){
        return {COD: 200, MESSAGE : "A unidade tem cursos vinculados"}
      }else{
        const unidade = await prisma.unidades.delete({
          where: {
            codigo : id
          }
        })
        return 
      }
     
    }catch (error: any){
      throw new Error("Erro ao deletar unidade:" + error.errors)
    }
  }

  async disable(id: any, action : any){
    try {
      if(action == 0){
        console.log(id)
        const unidade = await prisma.unidades.update({
          where: {
            codigo : id
          },
          data: {
            active : false
          }
        })
        return {unidade}
      }else{
        const unidade = await prisma.unidades.update({
          where: {
            codigo : id
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

export default new UnidadeRepository();
