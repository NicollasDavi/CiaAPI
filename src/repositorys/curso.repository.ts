import { Curso, CursoValor, PrismaClient } from "@prisma/client";
import { number } from "zod";

const prisma = new PrismaClient();

class CursoRepository{
    async save(curso: Curso){
        try {
            const { nome, informacao,unidade, turno, imagem, matricula } = curso;
            const newCurso = await prisma.curso.create({
                data: {
                    matricula,
                    nome,
                    unidade,
                    turno,
                    informacao,
                    imagem,
                },
            });
    
            return newCurso;
        } catch (error) {
            throw error;
        }
    }

   

    async getOne(id: string) {
    try {
        return( await prisma.curso.findUnique({
            where: {
               id: id
            }
        }))
    } catch (error) {
        return null;
    }
}

    async getAll(){
        try {
            const allCursos = await prisma.curso.findMany();
            console.log(allCursos)
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
            return null;
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