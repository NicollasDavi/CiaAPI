import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CursoRepository{
    async save(curso: any){
        try {
            const {codigo, nome, informacao, valor_E, valor_M, contra_T, integral} = curso;
            const newCurso = await prisma.curso.create({
                data: {
                    codigo,
                    nome,
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
}

export default new CursoRepository();