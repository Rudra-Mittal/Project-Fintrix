import { SendMoney } from "../../../components/SendMoney"
import prisma from "@repo/db/client"
import { P2pTransactions } from "../../../components/p2pTransactions"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { redirect } from "next/navigation"

async function getP2pTransactions(id:Number){
    
    const txns = await prisma.p2pTransfers.findMany({
        where: {
            OR: [
                {
                senderId: Number(id),
            },
            {
            receiverId: Number(id),
        }
            ]    
        },
        include:{
            sender:true,
            receiver:true,
        }
    });
    return txns.map(t => ({
        time: t.time,
        amount: t.amount,
        sender: t.sender.name,
        receiver:t.receiver.name,
        isSent: t.senderId ===id
    }))
}
export default async function Home(){
    const session = await getServerSession(authOptions);
    if(!session) redirect("/api/auth/signin");
    const transactions = await getP2pTransactions(Number(session?.user?.id));
    return (
        <div className="w-screen grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div className="h-fit rounded-xl p-3 border-1 border-black shadow-2xl">
        <SendMoney />
        </div>
        <div className="">
        <P2pTransactions transactions={transactions} />
        </div>
        </div>
    )
}