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
      const unidades = await prisma.unidades.findMany();
      console.log(unidades)
      return unidades
    } catch (error: any) {
      throw new Error("Deu rium patrão")
    }
  }
}

export default new UnidadeRepository();
