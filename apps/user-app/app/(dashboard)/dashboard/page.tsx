import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
export default async function home(){
    const session = await getServerSession(authOptions);
    if(!session) redirect('/api/auth/signin');
    const balance=await  prisma.balance.findFirst({
        where: {
            userId: Number(session.user.id)
        }
    })
    return (
        <div className="flex justify-between w-full" >
        <AddMoney />
        <BalanceCard amount={balance?.amount||0} locked={balance?.locked||0} />
        </div>
    );
}