import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";

export default function home(){
    return (
        <div className="flex justify-between w-full" >
        <AddMoney />
        <BalanceCard amount={100*100} locked={200*100} />
        </div>
    );
}