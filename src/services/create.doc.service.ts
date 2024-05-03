import { z } from "zod";
import docRepository from "../repositorys/doc.repository";

class CreateDocService {
    async executeCreate(data: any) {
        try {
            return docRepository.save(data);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeGetAll(id : number){
        try{
            return docRepository.getAll(id);
        }catch(error: any){
            throw new Error("Erro de validação" + error.errors)
        }
    }
}

export { CreateDocService };

