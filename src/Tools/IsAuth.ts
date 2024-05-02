import { PrismaClient, Usuario } from "@prisma/client";
import { status } from 'http-status';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();


class isAuth{
    async verify(matricula: number, token: string){
        try{
            const user = await prisma.usuario.findUnique({
                        where:{
                            matricula : matricula,
                            token: token,
                        }
                    })
            if (user == null){
                return { status: status.NOT_FOUND, message: 'Token invalido' };
            }
        }catch(error){
            throw new Error("Token invalido")
        }
      
    }

    async create(matricula: number) {
        try {
            // Gerar um token JWT
            const token = jwt.sign({ matricula }, 'seu_segredo', { expiresIn: '1h' });

            // Atualizar o usuário com o token gerado
            await prisma.usuario.update({
                where: {
                    matricula: matricula
                },
                data: {
                    token: token
                }
            });

            return { status: status.CREATED, message: 'Token criado com sucesso', token: token };
        } catch (error) {
            throw new Error("Erro ao criar token");
        }
    }
}


    async delete(){

    }
}

const verify = new isAuth().verify;
const create = new isAuth().create;
const remove = new isAuth().delete;

export { verify, create, remove };