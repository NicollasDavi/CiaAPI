import carouselRepository from "../repositorys/carousel.repository"

class CreateCarouselService{
    async executeCreate(data : any){
        try {
            console.log(data)
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
}

export { CreateCarouselService }
