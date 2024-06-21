import fs from 'fs';
import * as path from 'path';

export const limparDiretorioUploads = async () => {
    const uploadsDir = path.join(__dirname, '../uploads');

    try {
        await fs.promises.rmdir(uploadsDir, { recursive: true });
        console.log('Conteúdo do diretório de uploads limpo com sucesso');
    } catch (error) {
        console.error('Erro ao limpar o diretório de uploads:', error);
    }
};

export const lerArquivoPDF = async () => {
    try {
        const nomeDoArquivo = 'informativo.pdf';
        const caminhoDoArquivo = path.join(__dirname, `../uploads/${nomeDoArquivo}`);
        const pdfData = await fs.promises.readFile(caminhoDoArquivo);
        return pdfData;
    } catch (error) {
        console.error('Erro ao ler o PDF:', error);
        throw new Error('Erro ao ler o PDF');
    }
}

export const lerArquivo = async (id : string) => {
    try {
        const nomeDoArquivo = id;
        const caminhoDoArquivo = path.join(__dirname, `../docs/${nomeDoArquivo}`);
        const pdfData = await fs.promises.readFile(caminhoDoArquivo);
        return pdfData;
    } catch (error) {
        console.error('Erro ao ler o PDF:', error);
        throw new Error('Erro ao ler o PDF');
    }
}
