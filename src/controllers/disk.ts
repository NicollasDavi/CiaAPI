import { FastifyRequest, FastifyReply } from 'fastify';

class DiskController {
 async handleget(request: FastifyRequest, reply: FastifyReply){
    const os = require('os');

    // Obter informações sobre o sistema de arquivos
    const diskTotal: number = os.totalmem(); // Tamanho total da memória do disco em bytes
    const diskFree: number = os.freemem(); // Quantidade de memória do disco livre em bytes
    const diskUsed: number = diskTotal - diskFree; // Quantidade de memória do disco em uso em bytes

    // Converter bytes para gigabytes (GB) para tornar mais legível
    const toGB = (bytes: number): number => bytes / Math.pow(1024, 3);

    const diskInfo = {
        total: toGB(diskTotal),
        used: toGB(diskUsed),
        free: toGB(diskFree)
    };
    console.log(diskInfo)
    return reply.send(diskInfo);
 }
}

export { DiskController }
