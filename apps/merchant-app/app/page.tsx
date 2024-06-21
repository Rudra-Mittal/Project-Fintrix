"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function() {
  const session = useSession();
  return <div>
    <button onClick={() => signIn()} >Signin</button>
    {/* <Appbar user={session.status||false} onSignin={signIn} onSignout={signOut}/> */}
    <div>
      <br />
      <br />
      <br />
      {JSON.stringify(session)}
    </div>
  </div>
}