import {db} from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {userId} = auth();
    const data = await req.json();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const dino = await db.dino.create({
        data: {
            userId,
            ...data
        }
    });

    return NextResponse.json(dino);
  } catch (error: unknown) {
    console.error("[DINO]", (error as Error).message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}