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
}

export { CreateUnidadeService };

