import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: {params: {dinoId: string}}) {
    try {
        const {userId} = auth();
        const {dinoId} = params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedDino = await db.dino.delete({
            where: {
                id: dinoId,
                userId
            }
        });

        return NextResponse.json(deletedDino);
    } catch (error: unknown) {
        console.error("[DINO DELETE]", (error as Error).message);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request, 
    {params}: {params: {dinoId: string}}
) {
    try {
        const {userId} = auth();
        const {dinoId} = params;
        const {isPublished} = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dino = await db.dino.update({
            where: {
                id: dinoId,
                userId
            },
            data: {
                isPublished: isPublished
            }
        });
        
        return NextResponse.json(dino);
    } catch (error: unknown) {
        console.error("[DINO ID PATCH]", (error as Error).message);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}