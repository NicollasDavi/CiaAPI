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
        const existPdf = await prisma.pdfFile.findFirst();
        return existPdf?.url
    }
}

export default new pdfRepository()