import bugFeatureRepository from "../repositorys/bugfeature.repository"

class CreateBugFeaturetService{
    async executeCreate(data : any){
        return await bugFeatureRepository.save(data)
    }

    async executeGetAll(){
        return await bugFeatureRepository.get()
    }

    async executeDelete(id: string){
        return bugFeatureRepository.delete(id)
    }
}

export { CreateBugFeaturetService }