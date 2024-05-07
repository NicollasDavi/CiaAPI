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

    async executeGetAll(){
        try{
            return docRepository.getAll();
        }catch(error: any){
            throw new Error("Erro de validação" + error.errors)
        }
    }

    async executeGetOne(id : number){
        try{
            return docRepository.getOne(id);
        }catch(error: any){
            throw new Error("Erro de validação" + error.errors)
        }
    }
}

export { CreateDocService };

