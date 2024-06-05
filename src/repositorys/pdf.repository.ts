import { PdfFile, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient
class pdfRepository{
    async save(data: any){
        const pdf = await prisma.pdfFile.create({
            data
        })

        return pdf
    }

    async update(data: string) {
        const existPdf = await prisma.pdfFile.findFirst();
        if (!existPdf || existPdf.id !== "1") {
            const pdf = await prisma.pdfFile.create({
                data: {
                    id: "1",
                    url: data
                }
            });
            return pdf;
        } else {
            const pdf = await prisma.pdfFile.update({
                where: {
                    id: "1"
                },
                data
            });
            return pdf;
        }
    }

    async get(){
        const existPdf = await prisma.pdfFile.findFirst({
            where : {
                active : true
            }
        });
        return existPdf?.url
    }

    async getAll(){
        const existPdf = await prisma.pdfFile.findFirst();
        return existPdf
    }

    async disable(){
        const pdf = await prisma.pdfFile.findFirst()
        if(pdf?.active == true){
            await prisma.pdfFile.update({
                where :{
                    id : pdf?.id
                },
                data: {
                    active: false
                }
            })
        }else if(pdf?.active == false){
            await prisma.pdfFile.update({
                where :{
                    id : pdf?.id
                },
                data: {
                    active: true
                }
            })
        }
    }
}

export default new pdfRepository()