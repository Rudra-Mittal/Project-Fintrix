"use server"
import {PrismaClient} from '@prisma/client'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
const prisma = new PrismaClient();
export async function onRamp(amount:number,provider:string){
    const session =await getServerSession(authOptions)
      const trans=  await prisma.$transaction([
       prisma.onRampTransaction.create({
            data: {
                amount: Number(amount) * 100,
                status: 'Processing',
                userId:Number(session.user.id),
                
                provider:provider,
                startTime: new Date(),
                token: Math.random().toString(36).substring(7)
            }
        }),
        prisma.balance.update({
            where: {
                userId: Number(session.user.id)
            },
            data: {
                locked: {
                    increment: Number(amount) * 100
                }
            }
        })
      ])
      console.log(trans[1].amount, trans[1].locked);
       await prisma.$disconnect();
    return {
        status: 200,
        message: "Success",
        data:trans
    }
}