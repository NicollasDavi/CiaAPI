import * as fs from 'fs';
import * as path from 'path';

export const limparDiretorioUploads = async () => {
    const uploadsDir = path.join(__dirname, '../uploads');

    try {
        const arquivos = await fs.promises.readdir(uploadsDir);
        for (const arquivo of arquivos) {
            const filePath = path.join(uploadsDir, arquivo);
            await fs.promises.unlink(filePath);
        }
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

export const lerArquivo = async (id: string) => {
    try {
        const nomeDoArquivo = id;
        const caminhoDoArquivo = path.join(__dirname, `../docs/${nomeDoArquivo}`);
        const pdfData = await fs.promises.readFile(caminhoDoArquivo);
        return pdfData;
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        throw new Error('Erro ao ler o arquivo');
    }
}

export const deletarArquivo = async (id: string) => {
    try {
        const caminhoDoArquivo = path.join(__dirname, `../docs/${id}`);
        await fs.promises.unlink(caminhoDoArquivo);
        console.log(`Arquivo ${id} deletado com sucesso`);
    } catch (error) {
        console.error(`Erro ao deletar o arquivo ${id}:`, error);
        throw new Error(`Erro ao deletar o arquivo ${id}`);
    }
}
