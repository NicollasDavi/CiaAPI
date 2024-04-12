import { Curso, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CalcRepositor{
    async calcularMensalidade(data : any){
        const nome = data.nome
        const unidade = data.unidade
        const turno = data.turno
        const parce = data.parcelamento
        const desconto = data.desconto

        try {
            const curso = await prisma.curso.findUnique({
                where: {
                    nome: nome,
                    unidade : unidade,
                    turno : turno
                }
            });

            if (!curso) {
                throw new Error(`Curso com o código ${nome} não encontrado.`);
            }

            const Valor_M = curso.valor_M
            const Valor_E = curso.valor_E

            function calc(Valor_E : number, Valor_M : number, parcelamento: number, desconto : number){
                const mensalidade = desconto === 0 ? (Valor_E + Valor_M) / parcelamento : ((Valor_E * (1 - (desconto / 100))) + Valor_M) / parcelamento
                const mensalidadeFormatada = mensalidade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                return mensalidadeFormatada
            }

            function calcV(Valor_E: number, valor_M: number, desconto:number){
                const mensalidade = desconto == 0 ? (valor_M + Valor_E) * (1 - desconto/100) : (Valor_E * (1 - (desconto / 100)) + (Valor_M * (1 - 4 / 100)))
                const mensalidadeFormatada = mensalidade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                return mensalidadeFormatada
            }
           
            return parce == 1 ? calcV(Valor_E, Valor_M , desconto) : calc(Valor_E, Valor_M , parce, desconto)

        } catch (error) {
            console.error("Erro ao buscar o curso:", error);
        }
    
    }

    async calcularInverso(){
    }
}

export default new CalcRepositor();