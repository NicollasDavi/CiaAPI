import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient

class BugFeatureRepository{
    async save(data : any){
        const newBugorFeature = await prisma.bugsOrFeatures.create({
            data
        })
        console.log(newBugorFeature)
        return newBugorFeature
    }

    async get(){
        const bugsOrFeatures = await prisma.bugsOrFeatures.findMany()
        console.log(bugsOrFeatures)
        return bugsOrFeatures
    }

    async delete(id : string){
        const bugsOrFeature = await prisma.bugsOrFeatures.delete({
            where : {
                id
            }
        })
        console.log(bugsOrFeature)
        return bugsOrFeature
    }
}

export default new BugFeatureRepository()