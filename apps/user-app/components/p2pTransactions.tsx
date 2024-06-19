import { Card } from "@repo/ui/card"

export const P2pTransactions = ({ transactions }: {
    transactions: {
        amount: number,
        sender: number,
        time: Date,
        isSent: boolean
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
            {
                transactions.map(t => <div className={`shadow 2xl p-3 rounded  border-solid border-2 border-black flex justify-between my-3 ${(!t.isSent) ? "bg-green-100" : "bg-red-100"}`}>
                    <div className="flex flex-col justify-center">
                        <div className="flex  font-bold">


                            {(!t.isSent) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                            } <div className="ml-2">
                                $ {t.amount / 100}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm">
                            {(t.isSent) ? "Sent to" : "Received from"} {t.sender}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>


                </div>)
            }
        </div>
    </Card>
}