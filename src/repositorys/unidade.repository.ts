import { PrismaClient, Unidades } from "@prisma/client";

const prisma = new PrismaClient();

class UnidadeRepository {
  async save(data: Unidades) {
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
      console.log(unidades)
      return unidades
    } catch (error: any) {
      throw new Error("Deu rium patrão")
    }
  }

  async delete(id : any){
    try {
      const unidade = await prisma.unidades.delete({
        where: {
          codigo : id
        }
      })
      return unidade
    }catch (error: any){
      throw new Error("Erro ao deletar unidade:" + error.errors)
    }
  }

  async disable(id: any, action : any){
    try {
      if(action == 0){
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
