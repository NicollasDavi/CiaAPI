import { CreatePdfService } from "../services/create.pdf.service";
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
            
            // Certifique-se de que o diretório de uploads existe
            const uploadsDir = path.join(__dirname, '../uploads');
            
            // Verifique se há arquivos no diretório de uploads e, se houver, limpe-os
            const filesInUploadsDir = await fs.promises.readdir(uploadsDir);
            if (filesInUploadsDir.length > 0) {
                await limparDiretorioUploads()
            }
    
            // Crie o diretório de uploads se ele não existir
            await fs.promises.mkdir(uploadsDir, { recursive: true });
    
            // Obtenha os arquivos enviados na solicitação
            const parts = request.files();
    
            // Itere sobre os arquivos e salve-os no diretório de uploads
            for await (const part of parts) {
                const file = part.file;
                const filename = "informativo.pdf";
    
                // Construa o caminho completo para o arquivo
                const filePath = path.join(uploadsDir, filename);
    
                // Crie um stream de escrita para salvar o arquivo
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
    
            // Responda com sucesso
            return { message: 'Arquivos enviados com sucesso' };
        } catch (error) {
            // Lidar com erros
            console.error('Erro ao salvar o arquivo:', error);
            return reply.status(500).send({ error: 'Erro ao salvar o arquivo' });
        }
    }
}
export { PdfController }