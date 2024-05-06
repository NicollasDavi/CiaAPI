import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken'
dotenv.config();

export const authMiddlewere = (req: any, res: any, next: any) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send();
        }

        const parts = authorization.split(" ");

        if (parts.length !== 2) {
            return res.status(401).send();
        }

        const [schema, token] = parts;

        if (schema !== "Bearer") {
            return res.status(401).send();
        }

        const segredo = '2GxH#k8!wZs@p$U4';

        jwt.verify(token, segredo, (error: any, decoded: any) => {
            if (error) {
                return res.status(401).send();
            }
            console.log("token valido")
            next();
        });
    } catch (error) {
        throw new Error("Erro ao validar token")
    }
    
};
