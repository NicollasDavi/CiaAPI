import { z } from "zod";
import unidadeRepository from "../repositorys/unidade.repository";

class CreateUnidadeService {
    async executeCreate(data: any) {
        try {
            return unidadeRepository.save(data);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeGetAll(){
        try {
            return unidadeRepository.getAll();
        } catch (error: any) {
            throw new Error("Erro de Validação" + error.errors)
        }
    }

    async executeGetAllAdm(){
        try {
            return unidadeRepository.getAllAdm();
        } catch (error: any) {
            throw new Error("Erro de Validação" + error.errors)
        }
    }

    
    async executeGetOne(id: any){
        try {
            return unidadeRepository.getOne(id);
        } catch (error: any) {
            throw new Error("Erro de Validação" + error.errors)
        }
    }


    async executeDelete(id : any){
        try{
            return unidadeRepository.delete(id)
        } catch (error: any){
            throw new Error("Erro de Validação:" + error.errors)
        }
    }

    async executeDisable(id: any, active: any){
        try{
            return unidadeRepository.disable(id, active)
        } catch (error: any){
            throw new Error("Erro de Validação:" + error.errors)
        }
    }
}

export { CreateUnidadeService };

