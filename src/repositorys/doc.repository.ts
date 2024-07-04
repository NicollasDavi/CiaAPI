import { PrismaClient } from "@prisma/client";
import { deletarArquivo } from "../controllers/limparUpload";
import { Mutex } from 'async-mutex';

const prisma = new PrismaClient();
const mutex = new Mutex();

class DocRepository {
    async save(data: any) {
        const release = await mutex.acquire();
        try {
            const existingPage = await prisma.pagina.findFirst({
                where: {
                    nome: data.nome,
                    usuario: { matricula: parseInt(data.userId) }
                }
            });

            if (existingPage) {
                return { status: 'error', message: 'Documento com este título já existe.' };
            }

            const pagina = await prisma.pagina.create({
                data: {
                    nome: data.nome,
                    publica: data.publica,
                    usuario: { connect: { matricula: parseInt(data.userId) } },
                    tipos: {
                        create: data.types.map((tipo: any) => ({
                            type: tipo.type,
                            text: tipo.text,
                            img: tipo.img,
                            arqId: tipo.arqId,
                        }))
                    }
                },
                include: {
                    tipos: true
                }
            });
            return { status: 'success', pagina };
        } catch (error) {
            throw error;
        } finally {
            release();
        }
    }

    async getAll(id: string) {
        try {
            const uId = parseInt(id);
            const allDocs = await prisma.pagina.findMany({
                where: {
                    active: true,
                    OR: [
                        { publica: true },
                        { userId: uId }
                    ]
                },
                include: {
                    tipos: true
                }
            });
            return allDocs;
        } catch (error) {
            throw new Error("Erro na consulta");
        }
    }

    async getAllAdm() {
        try {
            const allDocs = await prisma.pagina.findMany();
            return allDocs;
        } catch (error) {
            throw new Error("Erro na consulta");
        }
    }

    async getOne(id: string) {
        try {
            const docTypes = await prisma.tipoDocumento.findMany({
                where: {
                    paginaId: id
                }
            });
            const pagina = await prisma.pagina.findUnique({
                where: {
                    id: id
                },
                select: {
                    userId: true,
                    nome: true
                }
            });

            if (!pagina) {
                throw new Error(`Página com id ${id} não encontrada`);
            }

            return { docTypes, userId: pagina.userId, nome: pagina.nome };
        } catch (error: any) {
            throw new Error(`Erro na consulta: ${error.message}`);
        }
    }

    async delete(id: string, action: number) {
        try {
            const doc = await prisma.pagina.findUnique({
                where: { id }
            });

            if (!doc) {
                throw new Error(`Documento com id ${id} não encontrado`);
            }

            if (action === 0) {
                if (doc.publica === false) {
                    const isPdf = await prisma.tipoDocumento.findMany({
                        where: {
                            paginaId: id,
                            arqId: { not: null }
                        }
                    });

                    for (const tipo of isPdf) {
                        if (tipo.arqId) {
                            await deletarArquivo(tipo.arqId);
                        }
                    }

                    await prisma.tipoDocumento.deleteMany({
                        where: {
                            paginaId: id
                        }
                    });

                    await prisma.pagina.delete({
                        where: {
                            id
                        }
                    });

                    return { doc };
                } else {
                    await prisma.pagina.update({
                        where: {
                            id
                        },
                        data: {
                            active: false
                        }
                    });

                    return { doc };
                }
            } else if (action === 1) {
                const updatedDoc = await prisma.pagina.update({
                    where: {
                        id
                    },
                    data: {
                        active: true
                    }
                });

                return { updatedDoc };
            } 
            else{
              try {
                const isPdf = await prisma.tipoDocumento.findMany({
                  where: {
                      paginaId: id
                  }
              });

              for (const tipo of isPdf) {
                  if (tipo.arqId) {
                      await deletarArquivo(tipo.arqId);
                  }
              }

              await prisma.tipoDocumento.deleteMany({
                  where: {
                      paginaId: id
                  }
              });

              const deletedDoc = await prisma.pagina.delete({
                  where: {
                      id
                  }
              });
              return { deletedDoc };
              } catch (error : any) {
                console.log(error.erros)
              }

                
            }
        } catch (error: any) {
            console.log(error);
            throw new Error("Erro ao executar ação");
        }
    }

    async getDesactivated() {
        try {
            const docsDesactivateds = await prisma.pagina.findMany({
                where: {
                    active: false
                }
            });
            return { docsDesactivateds };
        } catch (error) {
            throw new Error("Erro na consulta");
        }
    }
}

export default new DocRepository();
