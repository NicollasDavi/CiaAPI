import { string, z } from "zod";
import calcRepository from "../repositorys/calc.repository";
import { Curso } from "@prisma/client";


class CreateCalcService{
    async executeCalc(data:any) {
        

    
        try {
            return calcRepository.calcularMensalidadeDoCurso(data)
        } catch (error) {
            console.error("Erro ao executar o cálculo:", error instanceof z.ZodError ? error.errors : error);
        }
    }
    

    async executeCalcInverse(data : Curso){

    }
}

export {CreateCalcService}