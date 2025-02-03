import { hash } from "bcrypt";
import { prisma } from "../prisma";

export async function createAdminUser(){

    const adminUser = await prisma.usuario.findUnique({
        where: {
            nome: "admin"
        }
    })
    if(!adminUser){
        try{
            const hashedPassword = await hash(process.env.ADMIN_PASSWORD || "123456", 10);
            await prisma.usuario.create({
                data: {
                    nome: process.env.ADMIN_USER || "admin",
                    senha:  hashedPassword,
                    estaAdmin: true
                }
            })
            console.log("Usuário admin criado com sucesso");
        }
        catch(err){
            console.log(err, "Erro ao criar usuário admin");
        }	
    }
    else{
        console.log("Usuário admin já existe");
    }
}