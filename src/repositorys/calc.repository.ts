import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CursoData {
    id: string;
    unidade: string;
    turno: string;
    parcelamento: number;
    desconto: number;
}

class CalcRepository {
    async calcularMensalidadeDoCurso(data: CursoData) {
        const { id, unidade, turno, parcelamento, desconto } = data;

        try {
            const curso = await prisma.cursoValor.findUnique({ where: { id } });

            if (!curso) {
                throw new Error(`Curso com o código ${id} não encontrado.`);
            }

            const { valor_M: Valor_M, valor_E: Valor_E } = curso;

            const calcularMensalidade = (Valor_E: number, Valor_M: number, parcelamento: number, desconto: number): number => {
                return desconto === 0 
                    ? (Valor_E + Valor_M) / parcelamento 
                    : ((Valor_E * (1 - (desconto / 100))) + Valor_M) / parcelamento;
            };

            const mensalidade = parcelamento === 1 
                ? Valor_E + Valor_M 
                : calcularMensalidade(Valor_E, Valor_M, parcelamento, desconto);

            const valorEscola = Valor_E.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const valorMaterial = Valor_M.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const mensalidadeFormatada = mensalidade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            return { mensalidade: mensalidadeFormatada, valorEscola, valorMaterial };
        } catch (error) {
            console.error('Erro ao calcular mensalidade do curso:', error);
            throw new Error("Ocorreu um erro ao calcular a mensalidade do curso.");
        }
    }

    async calcularInverso(data: any) {
        const { id, unidade, turno, parcelamento, desconto } = data;
        
        try {
            const curso = await prisma.cursoValor.findFirst({ where: { id, unidade, turno } });
    
            if (!curso || !curso.valor_E) {
                throw new Error('Curso não encontrado ou valor_E não definido.');
            }
    
            const valor_sem_desconto = curso.valor_E / parcelamento;
            const valor_com_desconto = desconto - (curso.valor_M / parcelamento);
            const descontoDado = ((valor_sem_desconto - valor_com_desconto) / valor_sem_desconto) * 100;
    
            return { mensalidade: `${descontoDado.toFixed(2)}%` };
        } catch (error) {
            console.error('Erro ao calcular inverso:', error);
            throw new Error('Ocorreu um erro ao calcular o inverso.');
        }
    }
}

export default new CalcRepository();
