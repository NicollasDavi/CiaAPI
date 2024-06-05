import carouselRepository from "../repositorys/carousel.repository"

class CreateCarouselService{
    async executeCreate(data : any){
        try {
            return await carouselRepository.save(data)
        } catch (error: any) {
            throw new Error(error.errors)
        }
    }

    async executeGet(){
        try {
            return await carouselRepository.getAll()
        } catch (error: any) {
            throw new Error(error.errors)
        }
    }

    async executeGetAdm(){
        try {
            return await carouselRepository.getAllAdm()
        } catch (error: any) {
            throw new Error(error.errors)
        }
    }

    async executeDelete(id: string){
        try {
            return await carouselRepository.delete(id)
        } catch (error) {
            
        }
    }

    async executeDisable(id: any, active: any){
        try{
            return carouselRepository.disable(id, active)
        } catch (error: any){
            throw new Error("Erro de Validação:" + error.errors)
        }
    }
}

export { CreateCarouselService }
