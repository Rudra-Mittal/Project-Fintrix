"use server"
import {PrismaClient} from '@prisma/client'
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../lib/auth';
import { redirect } from 'next/navigation'
const prisma = new PrismaClient();
export async function onRamp(amount:number,provider:string){
    const session =await getServerSession(authOptions)
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
        }).catch((err) => {
            return {
                status: 500,
                message: "Error"
            }
        }
        );
       await prisma.$disconnect();
    return {
        status: 200,
        message: "Success",
        data:trans
    }
}