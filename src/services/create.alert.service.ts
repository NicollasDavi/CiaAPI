import alertRepository from "../repositorys/alert.repository"

class CreateAlertService{
    async executeCreate(body : any){
        try {
            return await alertRepository.save(body)
        } catch (error : any) {
            throw new Error(error.erors)
        }
    }

    async executeGetAll(){
        try {
            return await alertRepository.getAll()
        } catch (error: any) {
            throw new Error(error.erors)
        }
    }

    async executeDelete(id : string){
        try {
            return await alertRepository.delete(id)
        } catch (error : any) {
            throw new Error(error.erros)
        }
    }
}

export { CreateAlertService }