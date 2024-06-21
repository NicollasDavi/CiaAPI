import fs from 'fs';
import * as path from 'path';
import { limparDiretorioUploads, lerArquivoPDF } from "./limparUpload";


class PdfController{ 
    async handleGet(request: any, reply: any) {
        try {
            const pdfData = await lerArquivoPDF();
            const base64Data = Buffer.from(pdfData).toString('base64');
            const pdfUrl = `data:application/pdf;base64,${base64Data}`;
            return reply.send({ pdfUrl });
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao ler o PDF' });
        }
    }
    

    async handleGetAdm(request: any, reply: any){
        try {
            const pdfData = await lerArquivoPDF();
            const base64Data = Buffer.from(pdfData).toString('base64');
            const pdfUrl = `data:application/pdf;base64,${base64Data}`;
            return reply.send({ pdfUrl });
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao ler o PDF' });
        }
    }



    




    async handleUpdate(request: any, reply: any) {
        try {
            if (!request.isMultipart()) {
                return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
            }
            
            const uploadsDir = path.join(__dirname, '../uploads');
            
            const filesInUploadsDir = await fs.promises.readdir(uploadsDir);
            if (filesInUploadsDir.length > 0) {
                await limparDiretorioUploads()
            }
    
            await fs.promises.mkdir(uploadsDir, { recursive: true });
    
            const parts = request.files();
    
            for await (const part of parts) {
                const file = part.file;
                const filename = "informativo.pdf";
    
                const filePath = path.join(uploadsDir, filename);
    
                await new Promise<void>((resolve, reject) => {
                    const writeStream = fs.createWriteStream(filePath);
                    file.pipe(writeStream);
                    writeStream.on('finish', () => {
                        resolve();
                    });
                    writeStream.on('error', (err) => {
                        reject(err);
                    });
                });
            }
    
            return { message: 'Arquivos enviados com sucesso' };
        } catch (error) {
            console.error('Erro ao salvar o arquivo:', error);
            return reply.status(500).send({ error: 'Erro ao salvar o arquivo' });
        }
    }
}
export { PdfController }