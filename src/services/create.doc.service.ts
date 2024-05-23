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

    async executeGetAll(id: any){
        try{
            return docRepository.getAll(id);
        }catch(error: any){
            throw new Error("Erro de validação" + error.errors)
        }
    }

    async executeGetAllAdm(){
        try{
            return docRepository.getAllAdm();
        }catch(error: any){
            throw new Error("Erro de validação" + error.errors)
        }
    }

    async executeGetOne(id : string){
        try{
            return docRepository.getOne(id);
        }catch(error: any){
            throw new Error("Erro de validação" + error.errors)
        }
    }

    async executeDelete(id: string, action: any){
        try {
            console.log(id)
            return docRepository.delete(id, action)
        } catch (error: any) {
            console.log(id)

            throw new Error("Erro ao deletar documento" + error.erros)
        }
    }
}

export { CreateDocService };

