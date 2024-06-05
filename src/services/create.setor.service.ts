import setorRepository from "../repositorys/setor.repository"

class CreateSetorService{
    async executeCreate(data: any){
        return await setorRepository.save(data);
    }

    async executeGet(id: string){
        return await setorRepository.get(id)
    }

    async executeGetAll(){
        return await setorRepository.getAll()
    }

    async executeDelete(id: string){
        return await setorRepository.delete(id)
    }
}

export { CreateSetorService }