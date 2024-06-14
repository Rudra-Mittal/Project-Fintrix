"use client";
import { useBalance } from "@repo/store/balance";
import { Appbar } from "@repo/ui/appbar";
import { signIn,signOut } from "next-auth/react";
import { authOptions } from "../lib/auth";
import { useSession } from "next-auth/react";
export default function() {
  const session = useSession();
  const balance = useBalance();
  return <div>
    <button onClick={signIn} >Signin</button>
    {/* <Appbar user={session.status||false} onSignin={signIn} onSignout={signOut}/> */}
    <div>
      <br />
      <br />
      <br />
      {JSON.stringify(session)}
    </div>
  </div>
}