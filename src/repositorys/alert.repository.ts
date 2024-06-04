import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

class AlertRepository{
    async save(data :any){
        try {
            const alert = await prisma.aviso.create({
                data: {
                    ...data
                }
            })
            return alert
        } catch (error : any) {
            throw new Error(error.errors)
        }
    }

    async getAll(){
        const alerts = await prisma.aviso.findMany()
        return alerts
    }

    async delete(id : string){
        const alert = await prisma.aviso.delete({
            where: {
                id : id
            }
        })
        return alert
    }
}

export default new AlertRepository();