import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CursoData {
    nome: string;
    unidade: string;
    parcelamento: number;
    desconto: number;
}

class CalcRepository {
    async calcularMensalidadeDoCurso(data: CursoData) {
        const { nome, unidade, parcelamento, desconto } = data;

        try {
            const cursos = await prisma.cursoValor.findMany({ 
                where: { 
                    nome, 
                    unidade 
                } 
            });
            console.log(cursos)

            if (!cursos || cursos.length === 0) {
                throw new Error(`Cursos com o nome ${nome} na unidade ${unidade} não encontrados.`);
            }

            const calcularMensalidade = (valorEscola: number, valorMaterial: number, parcelamento: number): number => {
                return (valorEscola + valorMaterial) / parcelamento;
            };

            const calcularMensalidadeDesconto = (valorEscola: number, valorMaterial: number, parcelamento: number, desconto: number): number => {
                const valorEscolaComDesconto = valorEscola * (1 - (desconto / 100));
                return (valorEscolaComDesconto + valorMaterial) / parcelamento;
            };

            const resultado = {
                mensalidadeManha: "",
                mensalidadeTarde: "",
                mensalidadeNoite: "",
                mensalidadeOnline: "",
                mensalidadeManhaDesconto: "",
                mensalidadeTardeDesconto: "",
                mensalidadeNoiteDesconto: "",
                mensalidadeOnlineDesconto: ""
            };

            cursos.forEach(curso => {
                const { turno, valor_E: valorEscola, valor_M: valorMaterial } = curso;

                const mensalidade = parcelamento === 1 
                    ? valorEscola + valorMaterial 
                    : calcularMensalidade(valorEscola, valorMaterial, parcelamento);

                const mensalidadeDesconto = parcelamento === 1 
                    ? valorEscola * (1 - (desconto / 100)) + valorMaterial 
                    : calcularMensalidadeDesconto(valorEscola, valorMaterial, parcelamento, desconto);

                const mensalidadeFormatada = mensalidade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const mensalidadeDescontoFormatada = mensalidadeDesconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                switch (turno) {
                    case 'M':
                        resultado.mensalidadeManha = mensalidadeFormatada;
                        console.log(resultado.mensalidadeManha)
                        resultado.mensalidadeManhaDesconto = mensalidadeDescontoFormatada;
                        break;
                    case 'T':
                        resultado.mensalidadeTarde = mensalidadeFormatada;
                        resultado.mensalidadeTardeDesconto = mensalidadeDescontoFormatada;
                        break;
                    case 'N':
                        resultado.mensalidadeNoite = mensalidadeFormatada;
                        resultado.mensalidadeNoiteDesconto = mensalidadeDescontoFormatada;
                        break;
                    case 'E':
                        resultado.mensalidadeOnline = mensalidadeFormatada;
                        resultado.mensalidadeOnlineDesconto = mensalidadeDescontoFormatada;
                        break;
                }
            });
            console.log(resultado)
            return resultado;
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
