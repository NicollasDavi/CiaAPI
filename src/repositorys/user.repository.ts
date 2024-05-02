import { Curso, PrismaClient, Usuario } from "@prisma/client";
import { create, remove, verify } from "../Tools/IsAuth";
import { decode } from "jsonwebtoken";
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient();

class UserRepository{
    async save(user : Usuario){
        try {
            const {matricula, nome, senha, admin, isN } = user;
            const newUser = await prisma.usuario.create({
                data: {
                    matricula,
                    nome,
                    senha,
                    admin,
                    isN
                }
            });

            return newUser;
        } catch (error : any) {
            throw new Error(error.message);
        }
    }

    async getOne(id: number){
        try {
            const findedUser = await prisma.usuario.findUnique({
                where: {
                    matricula: id
                }
            });
            return {findedUser};
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAll(){
        try{
            const findAllUsers = await prisma.usuario.findMany();
            return {findAllUsers}
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    async deleteOne(id: number){
        try{
            const deletedUser = await prisma.usuario.delete({
                where: {
                    matricula : id
                }
            })
            return {deletedUser}
        }catch(error: any){
            throw new Error(error.message)
        }
    }

    async login(data: any) {
        console.log("entoru no login")
        const { matricula, password } = data;
        const matriculaInt = parseInt(matricula);
    
        try {
            const login = await prisma.usuario.findUnique({
                where: {
                    matricula: matriculaInt,
                    senha: password
                }
            });
    
            if (login) {
                console.log("logou")

                const isAdm = login.admin;
    
                const verifyToken = await verify(matricula, login.token);
                console.log("pasosu do token")

                if (verifyToken) {
                    console.log("entrou no verify");

                    const createdToken = await create(matricula);
                    if (isAdm) {
                        console.log(createdToken);
                        console.log("entrou");
                        return { URL: "http://localhost:3000/pages/home", createdToken };
                    } else {
                        return { URL: "http://localhost:3000/pages/home", createdToken };
                    }
                }else{
                    console.log("ja tinha token")
                    remove(matricula)

                    const createdToken = await create(matricula);
                    if (isAdm) {
                        console.log(createdToken);
                        console.log("entrou");
                        return { URL: "http://localhost:3000/pages/home", TOKEN: createdToken };
                    } else {
                        return { URL: "http://localhost:3000/pages/home", TOKEN: createdToken };
                    }
                }
            } else {
                throw new Error("Credenciais inválidas");
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
}

    async verifyLogged(token: string){
        try{
            const segredo = '2GxH#k8!wZs@p$U4';
            
            const decodedToken = jwt.verify(token, segredo);
            console.log('Token decodificado:', decodedToken);
            
            const matricula = decodedToken.matricula;
            console.log('Matrícula do usuário:', matricula);
            
            const user = await prisma.usuario.delete({
                where: {
                    matricula: matricula
                }
            });

            if(user.isAuth == false){
                return {URL: "http://localhost:3000/", RES: false}
            }
            
            return true;
        } catch(error: any) {
            throw new Error(error.message);
        }
    }


}
export default new UserRepository();