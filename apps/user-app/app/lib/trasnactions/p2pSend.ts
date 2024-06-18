"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export async function p2pSend(number: number, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session) return { status: 401, message: "Unauthorized" };
    try {
        const balance = await prisma.balance.findFirst({
            where: {
                userId: Number(session.user.id)
            }
        });
        if (balance?.amount < amount*100) {
            return { status: 400, message: "Insufficient Balance" };
        }
        const receiver = await prisma.user.findFirst({
            where: {
                number: number.toString()
            }
        });
        if (!receiver) {
            return { status: 404, message: "Receiver not found" };
        }
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: Number(session.user.id)
                },
                data: {
                    amount: {
                        decrement: amount*100
                    }
                }
            }),
            prisma.balance.update({
                where: {
                    userId: receiver.id
                },
                data: {
                    amount: {
                        increment: amount*100
                    }
                }
            })

        ]);
        return { status: 200, message: `${amount}$ sent successfully` };
    } catch (e) {
        console.log(e);
        return { status: 500, message: "Internal Server Error" };
    }
}