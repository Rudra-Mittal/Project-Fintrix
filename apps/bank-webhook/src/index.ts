import express from 'express';
import prisma from "@repo/db/client"
const app = express();

app.post('/webhook', (req, res) => {
    console.log('Webhook received');
    res.send('Webhook received');
});

app.post("/hdfcwebhook", async (req, res) => {
    const paymentInfo = {
        token: req.body.token,
        amount: req.body.amount,
        userId: req.body.user_identifier,
    }
    try{
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: paymentInfo.userId
                },
                data: {
                    // Increment the balance by the amount paid
                    amount: {
                        increment: paymentInfo.amount
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInfo.token
                },
                data: {
                    status: "Success"
                }
            })
        ])
        res.json({status: "Success"}).status(200);
    }catch(e){
        res.json({status: "Failed"}).status(500);
    }
})

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    }
    )
