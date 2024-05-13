import valueRepository from "../repositorys/value.repository";

class CreateValueService{
   
    async executeCreate(data: any) {

        try {
            return valueRepository.save(data);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    
}

export {CreateValueService}