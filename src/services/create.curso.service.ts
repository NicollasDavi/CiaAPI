import { z } from "zod";
import cursoRepository from "../repositorys/curso.repository";

class CreateCursoService {
    async executeCreate(data: any) {
        const createCursoSchema = z.object({
            codigo: z.string(),
            nome: z.string(),
            informacao: z.string(),
            valor_E: z.number(),
            valor_M: z.number(),
            contra_T: z.string(),
            integral: z.string(),
            turno: z.string(),
            unidade: z.string()
        });

        try {
            const validatedData = createCursoSchema.parse(data);
            return cursoRepository.save(validatedData);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeGetOne(nome : string){
        try {
            return cursoRepository.getOne(nome);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeGetAll(){
        try {
            return cursoRepository.getAll();
        } catch (error: any) {
            throw new Error("Não foi encontrado nenhum curso")
        }
    }

    async executeDeleteOne(nome : string){
        try {
            return cursoRepository.deleteOne(nome);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeUpdate(id: string, data: any){
        try {
            return cursoRepository.update(id, data)
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors)
        }
    }
}

export { CreateCursoService };
