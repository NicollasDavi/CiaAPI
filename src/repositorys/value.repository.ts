import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ValueRepository {
    async save(curso: any) {
        try {
            console.log("first");
            const { nome, valor_E, valor_M, unidade, turno } = curso;

            // Verifica se já existe um registro com os mesmos parâmetros
            const existingValue = await prisma.cursoValor.findFirst({
                where: {
                    nome: nome,
                    unidade: unidade,
                    turno: turno
                }
            });

            if (existingValue) {
                return { status: 'error', message: 'Valor de curso já existe com os mesmos parâmetros.' };
            }

            const newValue = await prisma.cursoValor.create({
                data: {
                    nome,
                    unidade,
                    turno,
                    valor_E,
                    valor_M,
                },
            });
            console.log(newValue);
            return { status: 'success', newValue };
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, data: any){
        const valor = await prisma.cursoValor.update({
            where:{
                id
            },
            data:{
                nome: data.nome,
                unidade: data.unidade,
                turno: data.turno,
                valor_E: data.valor_E,
                valor_M: data.valor_M,
            }
        })
        return {valor}
    }
    async getOne(id:string){
        const valor = await prisma.cursoValor.findUnique({
            where:{
                id
            }
        })

        return {valor}
    }
    async getAll() {
        try {
            const allValues = await prisma.cursoValor.findMany({
                where: {
                    active: true
                }
            });
            return allValues;
        } catch (error: any) {
            throw new Error("Erro na consulta");
        }
    }

    async getAllAdm() {
        try {
            const allValues = await prisma.cursoValor.findMany();
            return allValues;
        } catch (error: any) {
            throw new Error("Erro na consulta");
        }
    }

    async delete(id: string) {
        try {
            const value = await prisma.cursoValor.delete({
                where: {
                    id: id
                }
            });
            return value;
        } catch (error: any) {
            throw new Error("Erro na consulta");
        }
    }

    async disable(id: string, action: any) {
        console.log("veio");
        try {
            if (action == 0) {
                const value = await prisma.cursoValor.update({
                    where: {
                        id
                    },
                    data: {
                        active: false
                    }
                });
                return { value };
            } else {
                const value = await prisma.cursoValor.update({
                    where: {
                        id
                    },
                    data: {
                        active: true
                    }
                });
                return { value };
            }

        } catch (error: any) {
            throw new Error("Erro na consulta");
        }
    }
}

export default new ValueRepository();
