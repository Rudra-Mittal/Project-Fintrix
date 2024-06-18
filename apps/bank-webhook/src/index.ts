import express from 'express';
import {PrismaClient} from "@prisma/client"
const app = express();
const prisma =  new PrismaClient();
app.use(express.json());
app.post('/webhook', (req, res) => {
    console.log('Webhook received');
    res.send('Webhook received');
});

app.post("/hdfcwebhook", async (req, res) => {
    // console.log(req.body);
     const {token,amount,userId,status}=req.body; 
    // console.log(token);
    try{
        // checking if transaction is processed or not
        const transStatus=await prisma.onRampTransaction.findFirst({
            where:{
                token:token
            }
        })
        if(transStatus?.status!=="Processing"){
           return  res.json({status: "Failed"}).status(400);
        }
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: userId
                },
                data: {
                    // Increment the balance by the amount paid
                    amount: {
                        increment: (status)?amount*100:0
                    },
                    locked:{
                        decrement:amount*100
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: token
                },
                data: {
                    status:(status)?"Success":"Failure"
                }
            })
        ])
        res.json({status: "Success"}).status(200);
    }catch(e){
        console.log(e);
        res.json({status: "Failed"}).status(500);
    }
    prisma.$disconnect();
})

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    }
    )
