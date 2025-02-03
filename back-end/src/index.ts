import fastify from 'fastify';
import { Routes } from './routes/routes';
import { createAdminUser } from './utils/createAdminUser';
import cors from '@fastify/cors';


const app = fastify();

app.get("/test-route", async(request, reply) => {
    reply.code(200).send({ message: "Hello World" });
})
createAdminUser();
app.register(cors, {
    origin: "*"
});
app.register(Routes);

app.listen({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3333,
    host: "0.0.0.0"
}).then(() => {
    console.log("Por Favor acesse http://localhost:3333/test-route para ver verificar o funcionamento do servidor");
})