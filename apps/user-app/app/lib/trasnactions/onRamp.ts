"use server"
import {PrismaClient} from '@prisma/client'
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../lib/auth';
const prisma = new PrismaClient();
export async function onRamp(amount:number,provider:string){
    console.log("Transfer");
    const session =await getServerSession(authOptions)
    if(!session){
        return
    }
    // @ts-ignore
      const trans=  await prisma.onRampTransaction.create({
            data: {
                amount: Number(amount) * 100,
                status: 'Processing',
                userId:Number(session.user.id),
                
                provider:provider,
                startTime: new Date(),
                token: Math.random().toString(36).substring(7)
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        }
        );
       await prisma.$disconnect();
    
}