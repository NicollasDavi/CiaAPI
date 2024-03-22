import { z } from "zod";
import userRepository from "../repositorys/user.repository";
import { Usuario } from "@prisma/client";

class CreateUserService{
    async executeCreate(data : Usuario){
        const createUserSchema = z.object({
            matricula: z.number(),
            nome: z.string(),
            senha: z.string(),
            admin: z.boolean(),
            isN: z.boolean(),
        });

        try {
            const validatedData = createUserSchema.parse(data);
            return userRepository.save(validatedData);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeGetOne(id: number){
        try {
            return await userRepository.getOne(id);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeGetAll(){
        try{
            return await userRepository.getAll();
        }catch(error: any){
            throw new Error("Erro de validação " + error.errors)
        }
    }

    async executeDeleteOne(id: number){
        try {
            return await userRepository.deleteOne(id);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }
    
}

export { CreateUserService }