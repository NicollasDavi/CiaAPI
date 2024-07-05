import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BugFeatureRepository {
  async save(data: any) {
    try {
      const existingBugOrFeature = await prisma.bugsOrFeatures.findFirst({
        where: {
          text: data.text,
          type: data.type,
          createdBy: data.createdBy
        }
      });

      if (existingBugOrFeature) {
        return { status: 'error', message: 'Um bug ou feature com este texto e tipo já foi criado por este usuário.' };
      }

      const newBugOrFeature = await prisma.bugsOrFeatures.create({
        data
      });
      console.log(newBugOrFeature);
      return { status: 'success', newBugOrFeature };
    } catch (error: any) {
      throw new Error("Erro ao criar bug ou feature: " + error.message);
    }
  }

  async get() {
    try {
      const bugsOrFeatures = await prisma.bugsOrFeatures.findMany();
      console.log(bugsOrFeatures);
      return bugsOrFeatures;
    } catch (error: any) {
      throw new Error("Erro ao buscar bugs ou features: " + error.message);
    }
  }

  async delete(id: string) {
    try {
      const bugsOrFeature = await prisma.bugsOrFeatures.delete({
        where: {
          id
        }
      });
      console.log(bugsOrFeature);
      return bugsOrFeature;
    } catch (error: any) {
      throw new Error("Erro ao deletar bug ou feature: " + error.message);
    }
  }
}

export default new BugFeatureRepository();
