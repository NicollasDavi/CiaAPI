import { Curso, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CursoRepository{
    async save(curso: Curso){
        try {
            const {codigo, nome, informacao, valor_E, valor_M, contra_T, integral, unidade, turno} = curso;
            const newCurso = await prisma.curso.create({
                data: {
                    codigo,
                    nome,
                    unidade,
                    turno,
                    informacao,
                    valor_E,
                    valor_M,
                    contra_T,
                    integral,
                }
            });

            return newCurso;
        } catch (error : any) {
            throw new Error(error.message);
        }
    }

    async getOne(nome: string) {
    try {
        const findedCurso = await prisma.curso.findUnique({
            where: {
                nome: nome
            }
        });
        return {findedCurso};
    } catch (error) {
        console.error(error);
        return null;
    }
}

    async getAll(){
        try {
            const allCursos = await prisma.curso.findMany();
            return allCursos
        } catch (error: any) {
            throw new Error("Erro na consulta")
        }
    }
    
    async deleteOne(nome: string){
        try {
            const findedCurso = await prisma.curso.delete({
                where: {
                    nome: nome
                }
            });
            return {findedCurso};
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    async update(nome: string, data: any) {
        try {
            const { codigo, nome, informacao, valor_E, valor_M, contra_T, integral, unidade, turno } = data;
            const updatedCurso = await prisma.curso.update({
                where: {
                    nome: nome
                },
                data: {
                    codigo,
                    nome,
                    informacao,
                    valor_E,
                    turno,
                    unidade,
                    valor_M,
                    contra_T,
                    integral,
                },
            });
            return updatedCurso;
        } catch (error: any) {
            console.error("Erro ao atualizar curso:", error);
            throw new Error("Erro ao atualizar curso: " + error.message); 
        }
    }
    
}

export default new CursoRepository();