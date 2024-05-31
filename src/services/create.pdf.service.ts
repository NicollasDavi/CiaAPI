import pdfRepository from "../repositorys/pdf.repository";

class CreatePdfService{
    async executeCreate(data : any){
        try {
            return pdfRepository.save(data);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeGet(){

    }

    async executeUpdate(data: any){
        try {
            return pdfRepository.update(data);
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
    }

    async executeDelete(){

    }

    async executeDisable(action: any){

    }
}

export { CreatePdfService }