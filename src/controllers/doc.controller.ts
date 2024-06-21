import {CreateDocService} from "../services/create.doc.service"

import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { lerArquivo } from "./limparUpload";

class DocController{
    async handleCreate(request: any, reply: any){
        const { body } = request
        
        const createDocService = new CreateDocService();
        const result = await createDocService.executeCreate(body);
        return reply.send(result);
    }



    
    async  handleCreateArq(request: any, reply: any) {
    try {
        if (!request.isMultipart()) {
            return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
        }
        
        const docsDir = path.join(__dirname, '../docs');

        await fs.promises.mkdir(docsDir, { recursive: true });

        const parts = request.files();

        for await (const part of parts) {
            const file = part.file;
            const extension = path.extname(part.filename).toLowerCase();
            if (extension !== '.pdf' && extension !== '.doc' && extension !== '.docx') {
                return reply.status(400).send({ error: 'Apenas arquivos PDF e Word são permitidos' });
            }

            const filename = `${uuidv4()}${extension}`;
            const filePath = path.join(docsDir, filename);

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

async handleGetArq(request: any, reply: any) {
    const id = request.params.id;
    try {
        const fileData = await lerArquivo(id);
        let mimeType;
        if (id.endsWith('.pdf')) {
            mimeType = 'application/pdf';
        } else if (id.endsWith('.doc') || id.endsWith('.docx')) {
            mimeType = 'application/msword';
        } else {
            return reply.status(400).send({ error: 'Tipo de arquivo não suportado' });
        }
        const base64Data = Buffer.from(fileData).toString('base64');
        const fileUrl = `data:${mimeType};base64,${base64Data}`;
        return reply.send({ fileUrl });
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao ler o arquivo' });
    }
}

    async handleGetAll(request: any, reply: any){
        console.log("entrou")
        const id = request.params.id
        const createDocService = new CreateDocService();
        const result = await createDocService.executeGetAll(id);
        return reply.send(result);
    }

    async handleGetAllAdm(request: any, reply: any){
        const createDocService = new CreateDocService();
        const result = await createDocService.executeGetAllAdm();
        return reply.send(result);
    }

    async handleGetOne(request: any, reply: any){
        const id = request.params.id;
        const createDocService = new CreateDocService();
        const result = await createDocService.executeGetOne(id);
        console.log(result)
        return reply.send(result);
    }

    async handleDelete(request: any, reply: any){
        const id = request.params.id
        const action = request.params.action
        const createDocService = new CreateDocService();
        const result = createDocService.executeDelete(id, action)
        return reply.send(result)
    }
}

export { DocController }