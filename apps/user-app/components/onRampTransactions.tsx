import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className={` p-3 border-b-3 flex justify-between my-3 ${(t.status==="Success")?"bg-green-100":"bg-red-100"}`}>
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div>
                    {(t.status==="Success")?"+":""} Rs {t.amount / 100}
                    </div>
                    <div>
                        {t.status}
                    </div>
                </div>

            </div>)}
        </div>
    </Card>
}