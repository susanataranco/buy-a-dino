"use client";
import { useAuth } from "@clerk/nextjs";
import { dataGeneralSidebar } from "./SidebarRoutes.data";
import SidebarItem from "./SidebarItem/SidebarItem";

export default function SidebarRoutes() {
    const { userId } = useAuth();

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p className="mb-2 text-slate-500">GENERAL</p>
                    {dataGeneralSidebar.map((item) => 
                        <SidebarItem key={item.label} item={item} />
                    )}
                </div>
            </div>
        </div>
    )
}
