"use server"
import db from '@repo/db/client'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
export async function onRamp(amount:number,provider:string){
   try{
    const session =await getServerSession(authOptions)
    const trans=  await db.$transaction([
     db.onRampTransaction.create({
          data: {
              amount: Number(amount) * 100,
              status: 'Processing',
              userId:Number(session?.user?.id),
              
              provider:provider,
              startTime: new Date(),
              token: Math.random().toString(36).substring(7)
          }
      }),
      db.balance.update({
          where: {
              userId: Number(session?.user?.id)
          },
          data: {
              locked: {
                  increment: Number(amount) * 100
              }
          }
      })
    ])
    return {
        status: 200,
        message: "Success",
        data:trans
    }
   }catch(e){
       return {
           status: 500,
           message: "Internal Server Error"
       }
   }
}