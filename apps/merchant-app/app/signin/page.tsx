"use client"
import { signIn } from "next-auth/react";
export default function() {
    return <div>
        <button onClick={()=>{
            signIn("google")
        }}>Signin with google</button>
        {/* <Appbar user={session.status||false} onSignin={signIn} onSignout={signOut}/> */}
        hi there
    </div>
    }