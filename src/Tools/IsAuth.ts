import { PrismaClient} from "@prisma/client";
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient();


class isAuth{
    async verify(matricula: number, token: string) {
        try {
            const user = await prisma.usuario.findUnique({
                where: {
                    matricula: matricula,
                    token: token,
                }
            });
            if(!!user == true && user.token != ""){
                return false
            }
            return true
        } catch (error) {
            return false;
        }
    }

    async create(matricula: number) {
        try {
            const token = jwt.sign({ matricula }, '2GxH#k8!wZs@p$U4', { expiresIn: '24h' });

            await prisma.usuario.update({
                where: {
                    matricula: matricula
                },
                data: {
                    token: token
                }
            });

            return  token
        } catch (error) {
            return false
        }
    }


    async delete(matricula: number){
        try{
            const delToken = ""
            const token = await prisma.usuario.update({
                where: {
                    matricula : matricula
                },
                data:{
                    token: delToken
                }
            })
            return true
        }catch(error){
            return false
        }
    }
}

const verify = new isAuth().verify;
const create = new isAuth().create;
const remove = new isAuth().delete;

export { verify, create, remove };