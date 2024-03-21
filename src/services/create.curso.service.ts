import { z } from "zod";
import cursoRepository from "../repositorys/curso.repository";

class CreateCursoService {
    async executeCreate(data: any) {
        const createCursoSchema = z.object({
            codigo: z.number(),
            nome: z.string(),
            informacao: z.string(),
            valor_E: z.number(),
            valor_M: z.number(),
            contra_T: z.string(),
            integral: z.string(),
        });

        try {
            const validatedData = createCursoSchema.parse(data);
            return cursoRepository.save(data);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeGetOne(id : string){
        try {
            return cursoRepository.getOne(id);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }
}

export { CreateCursoService };
