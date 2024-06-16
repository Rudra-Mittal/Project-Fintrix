"use client"
import { useRouter,usePathname } from "next/navigation"
export function SidebarComponent({href,icon,title}:{href: string, icon: React.ReactNode, title: string}): JSX.Element{
    const router=useRouter();
    const pathname=usePathname();
    const onSamePath=(pathname===href);
    return (
        <div onClick={()=>{
            router.push(href);

        }} className={`flex ${(onSamePath)?"text-[#6a51a6]":"text-slate-500"} cursor-pointer p-2 pl-8`}>
            <div className="pr-2">{icon}</div>
            <div className={`font-bold ${onSamePath ? "text-[#6a51a6]" : "text-slate-500"}`}>{title}</div>
        </div>
    )
}