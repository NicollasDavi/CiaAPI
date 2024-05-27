import { CreateCalcService } from "../services/create.calc.service";

class CalcController {
    async handleCalc(request: any, reply: any) {
       
       const { body } = request
        try {
            const createCalcService = new CreateCalcService();
            const result = await createCalcService.executeCalc(body);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }

    async handleCalcInv(request: any, reply: any){
        const { body } = request
        try {
            const createCalcService = new CreateCalcService();
            const result = await createCalcService.executeCalcInverse(body)
            return reply.send(result)
        } catch (error: any) {
            return reply.send.status(400). send({ error : error.message })
        }
    }
}

export { CalcController };