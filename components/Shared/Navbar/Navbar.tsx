"use client";
import { useLovedDinos } from "@/hooks/use-loved-dinos";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Heart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "react-day-picker";

export default function Navbar() {
    const {userId} = useAuth();

    const {lovedItems} = useLovedDinos();

  return (
    <div className="max-w-5xl py-5 mx-auto">
        <div className="flex justify-between lg-flex">
            <Link href="/" className="flex items-center justify-center gap-x-2">
                <Image src="/logo.svg" width={50} height={50} alt={"Logo"} />
                <span className="text-xl font-bold">Book a Dino</span>
            </Link>

            <div className="flex items-center justify-center gap-x-7">
                <Link href="/dinos">List dinos</Link>
                <Link href="/dashboard">Dashboard</Link>
                {userId ? (
                    <>
                        <Link href="/loved-dinos">
                            <Heart strokeWidth={1} className={`cursor-pointer ${lovedItems.length > 0 && 'fill-black'}`}/>
                        </Link>
                        <UserButton />
                    </>
                ) : (
                    <Link href="/sign-in" className="flex gap-x-3">
                        <Button>
                            Sign in
                            <User className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    </div>
  )
}
