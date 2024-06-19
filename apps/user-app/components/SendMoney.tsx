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
    const [loading, setLoading] = useState(false);
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
                setLoading(true);
               const res=await p2pSend(number,amount);
                setLoading(false);
               if(res){
                if(res.status!==200){
                    setSuccess(false);
                }else{
                    setSuccess(true);
                }
                setMessage(res.message);
                // console.log(res.message)
               }

            }}>
                <div className="flex justify-center">
                    {(loading)?<div className="relative inline-flex mr-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                        <div className="w-4 h-4 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                    </div>:null}
                  <div> {(loading)?"Sending":"Send"}</div>
                </div>
        </Button>
            </div>
        </Card>
        </div>
    );
}