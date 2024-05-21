import valueRepository from "../repositorys/value.repository";

class CreateValueService{
   
    async executeCreate(data: any) {

        try {
            return valueRepository.save(data);
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

    async executeDelete(id: string) {

        try {
            return valueRepository.delete(id);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeDisable (id: string){
        try {
            return valueRepository.disable(id)
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    
}

export {CreateValueService}