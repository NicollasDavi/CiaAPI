import calcRepository from "../repositorys/calc.repository";


class CreateCalcService{
    async executeCalc(data:any) {
        try {
            return calcRepository.calcularMensalidadeDoCurso(data)
        } catch (error) {
            console.error("Erro ao executar o cálculo:");
        }
    }
    

    async executeCalcInverse(data : any){
        try {
            return calcRepository.calcularInverso(data)
        } catch (error) {
            console.log("Erro ao executar o cálcular:")
        }
    }
}

export {CreateCalcService}