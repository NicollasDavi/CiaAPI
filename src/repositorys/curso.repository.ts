import { Curso, PrismaClient } from "@prisma/client";
import { number } from "zod";

const prisma = new PrismaClient();

class CursoRepository{
    async save(curso: Curso){
        try {
            const {id, nome, informacao, valor_E, valor_M, contra_T, integral, unidade, turno, imagem, matricula} = curso;
            const newCurso = await prisma.curso.create({
                data: {
                    id,
                    matricula,
                    nome,
                    unidade,
                    turno,
                    informacao,
                    valor_E,
                    valor_M,
                    contra_T,
                    integral,
                    imagem,
                  },
            });

            return newCurso;
        } catch (error : any) {
            throw new Error(error.message);
        }
    }

    async getOne(id: string) {
        console.log(number)
    try {
        const findedCurso = await prisma.curso.findUnique({
            where: {
               id: id
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
    
    async deleteOne(id: string){
        try {
            const findedCurso = await prisma.curso.delete({
                where: {
                    id: id
                }
            });
            return {findedCurso};
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    async update(id: string, data: any) {
        try {
            const { matricula, nome, informacao, valor_E, valor_M, contra_T, integral, unidade, turno } = data;
            const updatedCurso = await prisma.curso.update({
                where: {
                    id: id
                },
                data: {
                    matricula,
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