import { PrismaClient, Unidades } from "@prisma/client";

const prisma = new PrismaClient();

class UnidadeRepository {
  async save(data: Unidades) {
    try {
      const unidade = await prisma.unidades.create({
        data: {
          codigo: data.codigo,
          horario: data.horario,
          informacoes: data.informacoes,
          nome: data.nome,
          numeroTel: data.numeroTel,
          numeroWpp: data.numeroWpp,
          vcep: data.vcep,
          
        },
      });
      console.log(unidade);
      return { unidade };
    } catch (error) {
      throw error;
    }
  }
}

export default new UnidadeRepository();
