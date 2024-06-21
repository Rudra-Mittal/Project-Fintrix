import { P2pTransactions } from "../../../components/p2pTransactions";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { OnRampTransactions } from "../../../components/onRampTransactions";
const session = await getServerSession(authOptions);
async function getOnRampTransactions() {
    if(!session) return [];
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    // console.log(session.user.id);
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
async function getP2pTransactions(){
    
    const txns = await prisma.p2pTransfers.findMany({
        where: {
            OR: [
                {
                senderId: Number(session?.user?.id),
            },
            {
            receiverId: Number(session?.user?.id),
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
        isSent: t.senderId ===Number(session?.user?.id)
    }))
}
export default async function home(){
 const transactions = await getOnRampTransactions();
 const p2pTransactions = await getP2pTransactions();  
 console.log(p2pTransactions)
    return (
        <div className="grid grid-cols-2">
         <div>
                <OnRampTransactions transactions={transactions} />
         </div>
         <div>
                <P2pTransactions transactions={p2pTransactions} />
         </div>
        </div>
    );
}