import { CursoValor, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class ValueRepository{
    async save(curso: CursoValor){
        try {
            console.log("first")
            const { nome, valor_E, valor_M, unidade, turno} = curso;
            const newCurso = await prisma.cursoValor.create({
                data: {
                    nome,
                    unidade,
                    turno,
                    valor_E,
                    valor_M,
                },
            });
    
            return newCurso;
        } catch (error) {
            throw error;
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
}

export default new ValueRepository