import {db} from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request, 
    {params}: {params: {dinoId: string}}
) {
    try {
        const {userId} = auth();
        const {dinoId} = params;
        const values = await req.json();


        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dino = await db.dino.update({
            where: {
                id: dinoId,
                userId
            },
            data: {
                ...values
            }
        });

        return NextResponse.json(dino);
    } catch (error: unknown) {
        console.error("[DINO FORM ID]", (error as Error).message);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}