import { Curso, PrismaClient, Usuario } from "@prisma/client";
import { create, remove, verify } from "../Tools/IsAuth";
import { decode } from "jsonwebtoken";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const prisma = new PrismaClient();

class UserRepository{
    async save(user : Usuario){
        try {
            const {matricula, nome, senha, admin, isN } = user;

            const hashedPassword = await bcrypt.hash(senha, 10)

            const newUser = await prisma.usuario.create({
                data: {
                    matricula,
                    nome,
                    senha : hashedPassword,
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

 
    async update(id: number, data: any) {
      try {
        const updatedUser = await prisma.usuario.update({
          where: {
            matricula: id,
          },
          data,
        });
        console.log(updatedUser)
        return { updatedUser };
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
    

    async logOut(id: number){
        try {
            const findedUser = await prisma.usuario.update({
                where: {
                    matricula: id
                },
                data:{
                    isAuth : false
                }
            });
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
        const { matricula, password } = data;
        const matriculaInt = parseInt(matricula);
    
        try {
            const login = await prisma.usuario.findUnique({
                where: {
                    matricula: matriculaInt,
                    senha: password
                }
            });
            const nome = login?.nome
            if (login) {
                const isAdm = login.admin;
                const isN = login.isN
    
                const verifyToken = await verify(matricula, login.token);

                const isAuth = await prisma.usuario.update({
                    where:{
                        matricula: matriculaInt
                    },
                    data:{
                        isAuth : true
                    }
                })

                if (verifyToken) {

                    const createdToken = await create(matricula);
                    console.log({ URL: "http://localhost:3000/pages/home", TOKEN: createdToken , USER: nome, ADM : isAdm, MAT: matricula, ISN : isN})

                    if (isAdm) {
            
                        return { URL: "http://localhost:3000/pages/home", TOKEN: createdToken , USER: nome, ADM : isAdm, MAT: matricula, ISN : isN};
                    } else {
                        return { URL: "http://localhost:3000/pages/home", TOKEN: createdToken , USER: nome, ADM : isAdm, MAT: matricula , ISN : isN};
                        
                    }
                }else{
                            remove(matricula)

                    const createdToken = await create(matricula);
                    console.log({ URL: "http://localhost:3000/pages/home", TOKEN: createdToken , USER: nome, ADM : isAdm, MAT: matricula, ISN : isN})

                    if (isAdm) {
            
                        return { URL: "http://localhost:3000/pages/home", TOKEN: createdToken , USER: nome, ADM : isAdm, MAT: matricula, ISN : isN};
                    } else {
                        return { URL: "http://localhost:3000/pages/home", TOKEN: createdToken , USER: nome, ADM : isAdm, MAT: matricula, ISN : isN};
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

            
            const matricula = decodedToken.matricula;

            
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