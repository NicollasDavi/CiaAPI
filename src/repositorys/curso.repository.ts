import { PrismaClient } from "@prisma/client";
import { Mutex } from 'async-mutex';

const prisma = new PrismaClient();
const mutex = new Mutex();

class CursoRepository {
    async save(curso: any) {
        const release = await mutex.acquire();
        try {
            const { nome, informacao, unidade, turno, imagem, matricula } = curso;

            // Verifique se já existe um curso com o mesmo nome e unidade
            const existingCurso = await prisma.curso.findFirst({
                where: {
                    nome: nome,
                    unidade: unidade
                }
            });

            if (existingCurso) {
                return { status: 'error', message: 'Curso com este nome e unidade já existe.' };
            }

            const newCurso = await prisma.curso.create({
                data: {
                    matricula: matricula,
                    nome: nome,
                    unidade: unidade,
                    turno: turno,
                    informacao: informacao,
                    imagem: imagem,
                    unidades: {
                        create: [
                            { unidade: { connect: { codigo: unidade } } },
                        ],
                    },
                },
            });

            console.log(newCurso);
            return { status: 'success', newCurso };
        } catch (error) {
            throw error;
        } finally {
            release();
        }
    }

    async getOne(id: string) {
        try {
            return await prisma.curso.findUnique({
                where: {
                    id: id
                }
            });
        } catch (error) {
            return null;
        }
    }

    async getAll() {
        try {
            const allCursos = await prisma.curso.findMany({
                where: {
                    active: true
                }
            });
            return allCursos;
        } catch (error: any) {
            throw new Error("Erro na consulta");
        }
    }

    async getAllByUnidade(id: any) {
        try {
            const allCursos = await prisma.curso.findMany({
                where: {
                    active: true,
                    unidade: id
                }
            });
            return allCursos;
        } catch (error: any) {
            throw new Error("Erro na consulta");
        }
    }

    async getAllAdm() {
        try {
            const allCursos = await prisma.curso.findMany();
            return allCursos;
        } catch (error: any) {
            throw new Error("Erro na consulta");
        }
    }

    async deleteOne(id: string) {
        console.log("Tentando deletar curso com id:", id);
        try {
            await prisma.cursoUnidade.deleteMany({
                where: {
                    cursoId: id
                }
            });

            const deletedCurso = await prisma.curso.delete({
                where: { id: id }
            });
            console.log("Curso deletado com sucesso:", deletedCurso);
            return { success: true, deletedCurso };
        } catch (error) {
            console.error("Erro ao deletar curso:", error);
            return { success: false, message: "Erro ao deletar curso." };
        }
    }

    async disable(id: string, action: any) {
        console.log("veio");
        try {
            if (action == 0) {
                const value = await prisma.curso.update({
                    where: {
                        id
                    },
                    data: {
                        active: false
                    }
                });
                return { value };
            } else {
                const value = await prisma.curso.update({
                    where: {
                        id
                    },
                    data: {
                        active: true
                    }
                });
                return { value };
            }
        } catch (error: any) {
            throw new Error("Erro na consulta");
        }
    }

    async update(id: string, data: any) {
        try {
            const { nome, informacao, unidade, turno } = data;
            const updatedCurso = await prisma.curso.update({
                where: {
                    id: id
                },
                data: {
                    nome,
                    informacao,
                    turno,
                    unidade,
                },
            });
            return updatedCurso;
        } catch (error: any) {
            throw new Error("Erro ao atualizar curso: " + error.message);
        }
    }
}

export default new CursoRepository();
