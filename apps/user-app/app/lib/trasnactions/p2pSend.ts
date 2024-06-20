"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export async function p2pSend(number: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session) return { status: 401, message: "Unauthorized" };
    if(amount<=0){
        return { status: 400, message: "Amount must be greater than 0" };
    }
    try {
        const receiver = await prisma.user.findFirst({
            where: {
                number: number
            }
        });
        if (!receiver) {
            return { status: 404, message: "Receiver not found" };
        }
        await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" where "userId"=${Number(session.user.id)} for UPDATE`
            const balance= await tx.balance.findUnique({
                where: {
                    userId: Number(session.user.id)
                }
            });
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            // @ts-ignore
            if (balance?.amount < amount*100) {
                throw new Error ("Insufficient balance")
            }
            await tx.balance.update({
                where: {
                    userId: Number(session.user.id)
                },
                data: {
                    amount: {
                        decrement: amount * 100
                    }
                }
            });
            await tx.balance.update({
                where: {
                    userId: receiver.id
                },
                data: {
                    amount: {
                        increment: amount * 100
                    }
                }
            });
            await tx.p2pTransfers.create({
                data: {
                    senderId: Number(session.user.id),
                    receiverId: receiver.id,
                    amount: amount * 100,
                    time:new Date()
                }
            });
        });

        return { status: 200, message: `${amount}$ sent successfully` };
    } catch (e:any) {
        console.log(e);
        return { status: 500, message: e.message ||"Internal Server Error" };
    }
}