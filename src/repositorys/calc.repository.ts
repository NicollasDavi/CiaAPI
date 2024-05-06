import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function calcularMensalidade(Valor_E: number, Valor_M: number, parcelamento: number, desconto: number) {
    const mensalidade = desconto === 0 ? (Valor_E + Valor_M) / parcelamento : ((Valor_E * (1 - (desconto / 100))) + Valor_M) / parcelamento;
    return mensalidade;
}

function calcularMensalidadeFormatada(mensalidade: number) {
    return mensalidade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

class CalcRepository {
    async calcularMensalidadeDoCurso(data: any) {
        const { id, unidade, turno, parcelamento, desconto } = data;
        try {
            const curso = await prisma.curso.findUnique({
                where: { id: id }
            });

            if (!curso) {
                throw new Error(`Curso com o código ${id} não encontrado.`);
            }

            const Valor_M = curso.valor_M;
            const Valor_E = curso.valor_E;

            const mensalidade = parcelamento === 1 ? Valor_E + Valor_M : calcularMensalidade(Valor_E, Valor_M, parcelamento, desconto);
            const valorEscola = Valor_E.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const valorMaterial = Valor_M.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const mensalidadeFormatada = calcularMensalidadeFormatada(mensalidade);

            return { mensalidade: mensalidadeFormatada, valorEscola, valorMaterial };
        } catch (error) {
            throw new Error("Ocorreu um erro ao calcular a mensalidade do curso.");
        }
    }

    async calcularInverso() {
    }
}

export default new CalcRepository();
