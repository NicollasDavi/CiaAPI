import valueRepository from "../repositorys/value.repository";

class CreateValueService{
   
    async executeCreate(data: any) {

        try {
            return valueRepository.save(data);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeUpdate(id: string, data: any) {

        try {
            return valueRepository.update(id, data);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeGetAll() {

        try {
            return valueRepository.getAll();
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeGetOne(id: string){
        try {
            return valueRepository.getOne(id);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }
    async executeGetAllAdm() {

        try {
            return valueRepository.getAllAdm();
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeDelete(id: string) {

        try {
            return valueRepository.delete(id);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeDisable (id: string,action: any){
        console.log(action)
        try {
            return valueRepository.disable(id, action)
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    
}

export {CreateValueService}