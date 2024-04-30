import { Curso, PrismaClient, Usuario } from "@prisma/client";

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
        const { matricula, password } = data;
        const matriculaInt = parseInt(matricula);
    
        try {
            const login = await prisma.usuario.findUnique({
                where: {
                    matricula: matriculaInt,
                    senha: password
                }
            });

            const isAdm = login?.admin
            console.log(login?.admin)
            if (login) {
                if (isAdm){
                    console.log("é true")
                    return { URL: "http://localhost:3000/pages/home" };

                }else{
                    console.log("é false")

                    return { URL: "http://localhost:3000/pages/home "};

                }

            } else {
                throw new Error("Credenciais inválidas");
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
}
export default new UserRepository();