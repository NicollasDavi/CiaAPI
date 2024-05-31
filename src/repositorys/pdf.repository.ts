import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient
class pdfRepository{
    async save(data: any){
        const pdf = await prisma.pdfFile.create({
            data
        })

        return pdf
    }

    async update(data: any){
        const pdf = await prisma.pdfFile.update({
            where : {
                id : "w3"
            },
            data
        })
    }
}

export default new pdfRepository()