import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient

class BugFeatureRepository{
    async save(data : any){

        const bug = await prisma.bugsOrFeatures.findFirst({
            where:{
                text: data.text,
                type: data.type,
                userId: data.userId
            }
        })
        if (bug){
            return ("já existe")
        }
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