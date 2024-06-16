import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session=await getServerSession(authOptions);
  const info=JSON.stringify(session?.user);
  // console.log(info);
  return (
   <div>
    Hello
    {(session?.user)?redirect("/dashboard"): redirect("/api/auth/signin")}
   </div>
  );
}
