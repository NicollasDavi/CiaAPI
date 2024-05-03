import { CreateUserService } from "../services/create.user.service";

class UserController{
    async handleCreate(request: any, reply: any){
        const { body } = request;
        try{
            const createUserService = new CreateUserService();
            const result = await createUserService.executeCreate(body);
            return reply.send(result);
        }catch(error: any){
            return reply.status(400).send({ error: error.message });
        }
    }

    async handleGetOne(request: any, reply: any){
        const id = parseInt(request.params.id);
        try{
            const createUserService = new CreateUserService();
            const result = await createUserService.executeGetOne(id);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }

    async handleLogOut(request: any, reply: any){
        console.log("Chegou auqi")
        const id = parseInt(request.params.id);
        try{
            const createUserService = new CreateUserService();
            const result = await createUserService.executeLogOut(id);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }

    async handleGetAll(request: any, reply: any){
        try{
            const createUserService = new CreateUserService();
            const result = await createUserService.executeGetAll();
            return reply.send(result);
        }catch(error: any){
            return reply.status(400).send({ error: error.message})
        }
    }

    async handleDeleteOne(request: any, reply: any){
        const id = parseInt(request.params.id);
        try{
            const createUserService = new CreateUserService();
            const result = await createUserService.executeDeleteOne(id);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }

    async verifyLoged(request: any, reply: any){
        const token = request.params.token;
        try{
            const createUserService = new CreateUserService();
            const result = await createUserService.executeVerifyLogged(token);
            return reply.send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }

    async handleLogin(request: any, reply: any){
        const { body } = request;
        try{
            const createUserService = new CreateUserService();
            const result = await createUserService.executeLogin(body);
            return reply.send(result)
        } catch (error: any){
            return reply.status(400).send({ error: error.message });
        }
    }
}

export { UserController }