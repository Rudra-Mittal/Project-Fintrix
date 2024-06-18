"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { p2pSend } from "../app/lib/trasnactions/p2pSend";
export function SendMoney(): JSX.Element{
    const [number , setNumber] = useState(0);
    const [amount , setAmount] = useState(0);
    const [success,setSuccess] = useState(false); 
    const [message, setMessage] = useState("");
    return (
        <div>
        <div className={(success)?`text-green-500 text-center`:`text-red-500 text-center `}>{message}</div>
        <Card title={"Send"}>
            <TextInput placeholder={"Mobile Number"} label={"Mobile Number"} onChange={(e)=>{
                setNumber(()=>Number(e));
            }} />
            <TextInput placeholder={"Amount"} label={"Amount"} onChange={(e)=>{
                setAmount(()=>Number(e));
            }} />
            <div className="flex justify-center mt-7">
            <Button onClick={async ()=>{
               const res=await p2pSend(number,amount);
               if(res){
                if(res.status!==200){
                    setSuccess(false);
                }else{
                    setSuccess(true);
                }
                setMessage(res.message);
                console.log(res.message)
               }

            }}>Send</Button>
            </div>
        </Card>
        </div>
    );
}