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
        try {
            return pdfRepository.get();
        } catch (error: any) {
            throw new Error("Erro de validação: " + error.errors);
        }
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

    async executeDisable(){
        try {
            return await pdfRepository.disable()
        } catch (error) {
            
        }
    }
}

export { CreatePdfService }