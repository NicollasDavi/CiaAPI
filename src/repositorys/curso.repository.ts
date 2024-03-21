import { Curso, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CursoRepository{
    async save(curso: Curso){
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

    async getOne(id: string) {
    try {
        const findedCurso = await prisma.curso.findUnique({
            where: {
                codigo: id
            }
        });
        return {findedCurso};
    } catch (error) {
        console.error(error);
        return null;
    }
}
    
    
    
}

export default new CursoRepository();