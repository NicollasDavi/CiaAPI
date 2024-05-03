import { z } from "zod";
import cursoRepository from "../repositorys/curso.repository";

class CreateCursoService {
    async executeCreate(data: any) {

        try {
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

    async executeGetAll(){
        try {
            return cursoRepository.getAll();
        } catch (error: any) {
            throw new Error("Não foi encontrado nenhum curso")
        }
    }

    async executeDeleteOne(id : string){
        try {
            return cursoRepository.deleteOne(id);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeUpdate(id: string, data: any){
        console.log(id)

        try {
            return cursoRepository.update(id, data)
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors)
        }
    }
}

export { CreateCursoService };

