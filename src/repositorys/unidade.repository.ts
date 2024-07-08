import { PrismaClient } from "@prisma/client";
import { Mutex } from 'async-mutex';

const prisma = new PrismaClient();
const mutex = new Mutex();

class UnidadeRepository {
  async save(data: any) {
    const release = await mutex.acquire();
    try {
      // Verifique se já existe uma unidade com o mesmo nome, número de telefone ou WhatsApp
      const existingUnidade = await prisma.unidades.findFirst({
        where: {
          OR: [
            { nome: data.nome },
            { numeroTel: data.numeroTel },
            { numeroWpp: data.numeroWpp }
          ]
        }
      });

      if (existingUnidade) {
        return { status: 'error', message: 'Unidade com este nome ou número de telefone/WhatsApp já existe.' };
      }

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

      return { status: 'success', unidade };
    } catch (error) {
      throw error;
    } finally {
      release();
    }
  }

  async getAll() {
    try {
      const unidades = await prisma.unidades.findMany({
        where: {
          active: true
        }
      });
      return unidades;
    } catch (error: any) {
      throw new Error("Deu rium patrão");
    }
  }

  async getAllAdm() {
    try {
      const unidades = await prisma.unidades.findMany();
      return unidades;
    } catch (error: any) {
      throw new Error("Deu rium patrão");
    }
  }

  async getOne(id: string) {
    try {
      return await prisma.unidades.findUnique({
        where: {
          codigo: id
        }
      });
    } catch (error) {
      return null;
    }
  }

  async delete(id: any) {
    const release = await mutex.acquire();
    try {
      const curso = await prisma.cursoUnidade.findFirst({
        where: {
          unidadeId: id
        }
      });

      if (curso) {
        return { status: 'error', message: 'A unidade tem cursos vinculados.' };
      } else {
        const unidade = await prisma.unidades.delete({
          where: {
            codigo: id
          }
        });
        return { status: 'success', unidade };
      }

    } catch (error: any) {
      throw new Error("Erro ao deletar unidade:" + error.message);
    } finally {
      release();
    }
  }

  async disable(id: any, action: any) {
    const release = await mutex.acquire();
    try {
      const unidade = await prisma.unidades.update({
        where: {
          codigo: id
        },
        data: {
          active: action === 0 ? false : true
        }
      });
      return { unidade };
    } catch (error: any) {
      throw new Error("Erro ao desabilitar unidade: " + error.message);
    } finally {
      release();
    }
  }

  async update(id: string, data: any){
      const unidade = await prisma.unidades.update({
        where:{
          codigo: id
        },
        data: {
          horario: data.horario,
          imagem: data.imagem,
          informacoes: data.informacoes,
          nome: data.nome,
          numeroTel: data.numeroTel,
          numeroWpp: data.numeroWpp,
          vcep: data.vcep
        }
      })
      return { unidade };
  }
}

export default new UnidadeRepository();
