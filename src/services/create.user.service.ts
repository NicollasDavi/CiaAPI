import { z } from "zod";
import userRepository from "../repositorys/user.repository";
import { Usuario } from "@prisma/client";
import { remove } from "../Tools/IsAuth";

class CreateUserService{

    async executeLogin(data : any){
        try{
            return userRepository.login(data);
        } catch (error) {

        }
    };

    async executeCreate(data : Usuario){
        const createUserSchema = z.object({
            matricula: z.number(),
            nome: z.string(),
            senha: z.string(),
            admin: z.boolean(),
            isN: z.boolean(),
            token: z.string(),
            isAuth: z.boolean()
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

    async executeLogOut(id: number){
        remove(id)
        try {
            return await userRepository.logOut(id);
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

    async executeVerifyLogged(token: string){
        try {
            return await userRepository.verifyLogged(token);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }
    
}

export { CreateUserService }